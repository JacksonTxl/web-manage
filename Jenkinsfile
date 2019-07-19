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
    stage('to=saas-dev') {
      when {
        expression { BRANCH_NAME ==~ /(feat|dev).*/}
      }
      steps {
        sh 'make build'
        sh 'make rsync to=saas-dev'
        sh 'make release to=saas-dev'
        echo "https://saas.dev.styd.cn"
      }
    }
    stage('to=saas-test') {
      when {
        expression { BRANCH_NAME ==~ /(test).*/}
      }
      steps {
        sh 'make build'
        sh 'make rsync to=saas-test'
        sh 'make release to=saas-test'
        sh 'make rsync to=saas-dev'
        sh 'make release to=saas-dev'
        echo "https://saas.test.styd.cn"
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
