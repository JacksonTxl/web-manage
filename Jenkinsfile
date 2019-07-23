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
<<<<<<< HEAD
    stage('to=saas-dev') {
=======
    stage('branch-test') {
>>>>>>> test
      when {
        expression { BRANCH_NAME ==~ /test/}
      }
      steps {
        sh 'make build'
<<<<<<< HEAD
=======

        sh 'make rsync to=saas-test'
        sh 'make release to=saas-test'

>>>>>>> test
        sh 'make rsync to=saas-dev'
        sh 'make release to=saas-dev'
      }
    }
    stage('branch-other') {
      when {
        expression { BRANCH_NAME ==~ /(feat|fix|dev).*/}
      }
      steps {
        sh 'make build'
<<<<<<< HEAD
        sh 'make rsync to=saas-test'
        sh 'make release to=saas-test'
=======
        sh 'make rsync-branch to=saas-test'
        sh 'make release-branch to=saas-test'

>>>>>>> test
        sh 'make rsync to=saas-dev'
        sh 'make rsync-branch to=saas-dev'
        sh 'make release to=saas-dev'
        sh 'make release-branch to=saas-dev'
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
