pipeline {
  agent any
  stages {
    stage('Info') {
      steps {
        sh 'id'
        sh 'uname -a'
        sh 'tree -du -L 4'
      }
    }
    stage('Build') {
      steps {
        sh 'make build'
      }
    }
    stage('Rsync') {
      parallel {
        stage('dev') {
          when {
            expression { BRANCH_NAME ==~ /(feat|dev).*/}
          }
          steps {
            sh 'make rsync to=saas-dev'
          }
        }
        stage('test') {
          when {
            branch 'test'
          }
          steps {
            echo 'to test server'
          }
        }
        stage('pre') {
          when {
            branch 'master'
          }
          steps {
            echo 'to pre server'
          }
        }
        stage('prod') {
          when {
            branch 'production'
          }
          steps {
            echo 'to production server'
          }
        }
      }
    }
    stage('Release') {
      parallel {
        stage('dev') {
          when {
            expression { BRANCH_NAME ==~ /(feat|dev).*/}
          }
          steps {
            sh 'make release to=saas-dev'
          }
        }
        stage('test') {
          when {
            branch 'test'
          }
          steps {
            echo 'release to test server'
          }
        }
        stage('pre') {
          when {
            branch 'master'
          }
          steps {
            echo 'release to pre server'
          }
        }
        stage('prod') {
          when {
            branch 'production'
          }
          steps {
            echo 'release to production server'
          }
        }
      }
    }
  }
  post {
    always {
      // 始终删除构建过程中产出的文件
      sh 'make clean'
    }
  }
}
