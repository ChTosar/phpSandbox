
<div align="center">
<img src="img/apple-icon-180x180.png">
</div>

# Php Sandbox

This is a little and experimental software to try some php code in your own servers.

It is highly unrecommended used in a public server because have not restriccions of context or execution limits (that's the whole fun). 

# Intallation 

Drop the folder in your server and check the permissions and user owner, create manually the code.php file if you have creation files issues.

# Configure Server list

For use Php Sandbox in more installations/instances of php only need isstall the same files in the others serves and acced directly or by other instances configurin the file of server_list.php folowing the array example.

```
$serverList = array( 
    
    0 => array(
        'name' => 'Example',
        'url' => 'https://ipAddresOrDomain.com/phpSandboxDir/index.php',
        'des' => '',            
    ),

 );

```
