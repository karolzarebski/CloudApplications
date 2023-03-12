Vagrant.configure("2") do |config|
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
      vb.cpus = 2
    end

    # Database machine
    config.vm.define "db" do |db|
        db.vm.box = "ubuntu/xenial64"
        db.vm.network "private_network", ip: "192.168.56.4"
        db.vm.provision "ansible" do |ansible|
            ansible.playbook = "db.yml"
        end
    end

    # Backend machine
    config.vm.define "backend" do |backend|
      backend.vm.box = "generic/debian11"
      backend.vm.network "private_network", ip: "192.168.56.2"
      backend.vm.provision "ansible" do |ansible|
        ansible.playbook = "backend.yml"
      end
    end
  
    # Frontend machine
    config.vm.define "frontend" do |frontend|
      frontend.vm.box = "generic/debian11"
      frontend.vm.network "forwarded_port", guest: 80, host: 1234
      frontend.vm.network "private_network", ip: "192.168.56.3"
      frontend.vm.provision "ansible" do |ansible|
        ansible.playbook = "frontend.yml"
      end
    end
  end
  
