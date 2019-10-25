pipeline {
  agent any
  options {
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(numToKeepStr: '5'))
    disableConcurrentBuilds()
  }
  stages {
    stage('Info') {
      steps {
        sh 'id'
        sh 'uname -a'
        sh 'tree -du -L 4'
      }
    }
    stage('Build') {
      /** master 分支不参与自动构建 */
      when {
        expression { BRANCH_NAME ==~ /(feat|fix|dev|test).*/}
      }
      steps {
        sh 'make build'
      }
    }
    stage('to=dev') {
      when {
        expression { BRANCH_NAME ==~ /(feat|fix|dev|test).*/}
      }
      steps {
        sh 'make rsync to=saas-dev'
        sh 'make release to=saas-dev'
        sh 'make rsync-branch to=saas-dev'
        sh 'make release-branch to=saas-dev'
        echo "https://saas.dev.styd.cn"
      }
    }
    stage('to=test') {
      when {
        expression { BRANCH_NAME ==~ /(feat|fix|dev|test).*/}
      }
      steps {
        sh 'make rsync to=saas-test'
        sh 'make release to=saas-test'
        sh 'make rsync-branch to=saas-test'
        sh 'make release-branch to=saas-test'
        echo "https://saas.test.styd.cn"
      }
    }
    // stage('prod-Build') {
    //   when {
    //     expression { BRANCH_NAME ==~ /(master).*/}
    //   }
    //   steps {
    //     sh 'make build'
    //   }
    // }
    // stage('to=prod') {
    //   when {
    //     expression { BRANCH_NAME ==~ /(master).*/}
    //   }
    //   steps {
    //     sh 'make rsync to=saas-nginx-m'
    //   }
    // }
  }
  post {
    always {
      // 始终删除构建过程中产出的文件
      sh 'make clean'
    }
  }
}
