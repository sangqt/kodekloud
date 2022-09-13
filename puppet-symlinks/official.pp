class symlink {
  file { '/opt/data':
    ensure => 'link',
    target => '/var/www/html',
  }

  file { '/opt/data/blog.txt':
    ensure => 'present',
    replace => 'no'
  }
}

node stapp01.stratos.xfusioncorp.com {
    include symlink
}