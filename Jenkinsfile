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
    stage('to=saas-dev') {
      when {
        expression { BRANCH_NAME ==~ /(feat|dev).*/}
      }
      steps {
        sh 'make rsync to=saas-dev'
        sh 'make release to=saas-dev'
        echo "https://saas-dev-ui.styd.cn"
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
