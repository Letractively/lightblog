<?php
/*************************************************

  LightBlog - PHP SQLite blogging platform
  Copyright 2008 soren121 and aldo.
  
  This software is released under the GNU
  General Public License version 3. For more
  accurate licensing information, please see
  the LICENSE.txt file included in this
  distribution.
  
  Install.php
  
*************************************************/

// SQL query extractor class
// Written by Merianos Nikos of phpclasses.com
// Released into the public domain

class queryExtractor {
	private $fileName;	
	private $fileContent;
	public $SqlQueries;
	public function __construct($fileLocation = '') {
		if(strlen($fileLocation) < 1) {
			$this->fileName = '';
		}
		
		else {
			$this->fileName = $fileLocation;
		}
	}

	public function extractQueries() {
		// set defaults
		$fileSize = 0;
		$query = '';
		
		// return nothing if SQL file is empty
		if(strlen($this->fileName) < 1) {
			return '';
		}
		
		else {
			// open file for reading
    		$file = @fopen("$this->fileName", "r");
			// read 32K of file
    		$rf = fread($file, 32000);
			// close file
    		fclose($file);

    		if(strlen($rf) > 0) {
    			$fileSize = strlen($rf);
    			
    			for($i = 0; $i <= $fileSize; $i++) {
    				if(substr($rf, $i, 1) == ';') {
    					$this->SqlQueries[] = $query . substr($rf, $i, 1);
    				}
					
    				else {
    					$query .= substr($rf, $i, 1);
    				}
    			}
    		}
			
    		else {
    			$this->SqlQueries = '';
    			return $this->SqlQueries;
    		}
		}
	}
}
 
// Database name generator
// Based on code from www.webtoolkit.info
function generateDatabaseName($length=9, $strength=0) {
    $vowels = 'aeuy';
    $consonants = 'bdghjmnpqrstvz';
    if ($strength & 1) {
        $consonants .= 'BDGHJLMNPQRSTVWXZ';
    }
    if ($strength & 2) {
        $vowels .= "AEUY";
    }
    if ($strength & 4) {
        $consonants .= '23456789';
    }
    if ($strength & 8) {
        $consonants .= '@#$%';
    }

    $password = '';
    $alt = time() % 2;
    for ($i = 0; $i < $length; $i++) {
        if ($alt == 1) {
            $password .= $consonants[(rand() % strlen($consonants))];
            $alt = 0;
        } else {
            $password .= $vowels[(rand() % strlen($vowels))];
            $alt = 1;
        }
    }
    return $password;
}

// The exciting part! :P 
if(isset($_POST['install'])) {
	// Generate database name
	$dbname = generateDatabaaseName(10, 4).'.db';
	// Create database
	fclose(fopen($dbname, 'w')) or die('Could not create the database. Please check your permissions.';
	// Open database for writing
	$handler = sqlite_open($dbname) or die('WTF? Could not open the database. Please check your permissions.';
	// Inject SQL into database
	$sqle = new queryExtractor("Install.sql");
	sqlite_query($handler, $sqle->extractQueries()) or die('Could not write to the database. Please check your permissions.';
	// Close and unset all variables
	unset($dbname, $sqle);
	sqlite_close($handler);
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>LightBlog 1.0 Installer</title>
	<style type="text/css">
	body {
		background: #eeeeec;
		text-align: center;
	}
	#container {
		text-align: left;
		background: #8AE234;
		width: 340px;
		height: 400px;
	}
	#title {
		color: #fff;
	}
	#contentbox {
		margin: 3px;
		background: #B8EB85;
		color: #000000;
	}
	.button {
		background: #eeeeec;
		border: 3px solid #d3d7cf;
		padding: 5px;
		text-align: center;
	}
  </style>
</head>
<body>
	<div id="container">
		<div id="title">
			<p>LightBlog SVN Installer</p>
		</div>
		<div class="contentbox">
			<p>Welcome to the quick 'n dirty installer for LightBlog SVN. Click Install to create the database.</p>
			<form action="" method="get">
				<input class="button" type="button" name="install" value="Install" />
			</form>
		</div>
	</div>
</body>
</html>