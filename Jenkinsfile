pipeline {
    agent any
    
    options {
        timeout(time: 1, unit: 'HOURS')
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://www.saucedemo.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install --with-deps'
                    } else {
                        bat 'npx playwright install'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright test --project=chromium'
                    } else {
                        bat 'npx playwright test --project=chromium'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
            
            // Uncomment if HTML Publisher plugin is installed in Jenkins:
            /*
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
            */
        }
        failure {
            echo 'Playwright tests encountered failures. Inspect archived test results and traces.'
        }
    }
}
