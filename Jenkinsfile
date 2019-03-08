pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'make build'
            }
        }
        stage('Test') {
            steps {
                echo 'Test'
            }
        }
        stage('rsync dev') {
          when {
            branch 'dev'
          }
          steps {
            sh 'make rsync to=saas-dev'
          }
        }
        stage('release dev') {
          when {
            branch 'dev'
          }
          steps {
            sh 'make release to=saas-dev'
          }
        }
    }
}
