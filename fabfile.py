import os
import re
from datetime import datetime
from fabric.api import *

env.user = 'root'
env.sudo_user = 'root'
env.hosts = ['45.32.48.50']
db_user = 'root'
db_password = ''

_TAR_FILE = 'dist.tar.gz'
_REMOTE_TMP_TAR = '/tmp/%s' % _TAR_FILE
_REMOTE_BASE_DIR = '/home/static'


def build():
    includes = ['static', 'transwarp', '*.css', '*.map', '*.ttf', '*.woff2', '*.js', '*.html', '*.ico']
    excludes = ['test', '.*', '*.pyc', '*.pyo']
    local('rm -f dist/%s' % _TAR_FILE)
    with lcd(os.path.join(os.path.abspath('.'), 'dist')):
        cmd = ['tar', '--dereference', '-czvf', './%s' % _TAR_FILE]
        cmd.extend(['--exclude=\'%s\'' % ex for ex in excludes])
        cmd.extend(includes)
        local(' '.join(cmd))


def deploy():
    newdir = 'dist-%s' % datetime.now().strftime('%y-%m-%d_%H.%M.%S')
    # rm -f /tmp/dist-awesome.tar.gz
    run('rm -f %s' % _REMOTE_TMP_TAR)
    # put dist/dist-awesome.tar.gz /tmp/dist-awesome.tar.gz
    put('dist/%s' % _TAR_FILE, _REMOTE_TMP_TAR)
    # cd /home/static
    with cd(_REMOTE_BASE_DIR):
        sudo('mkdir %s' % newdir)
    # cd /home/static/newdir
    with cd('%s/%s' % (_REMOTE_BASE_DIR, newdir)):
    	# tar -xzvf /tmp/dist-awesome.tar.gz
        sudo('tar -xzvf %s' % _REMOTE_TMP_TAR)
    with cd(_REMOTE_BASE_DIR):
        sudo('rm -rf www')
        sudo('ln -s %s www' % newdir)
        # sudo('chown www-data:www-data www')
        # sudo('chown -R www-data:www-data %s' % newdir)
    # with settings(warn_only=True):
    #     sudo('supervisorctl stop awesome')
    #     sudo('supervisorctl start awesome')
    #     sudo('/etc/init.d/nginx reload')
