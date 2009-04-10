<?php session_start();

/*********************************************

	LightBlog 0.9
	SQLite blogging platform
	
	Sources/ProcessAJAX.php
	
	�2009 soren121. All rights reserved.
	Released under the GNU General
	Public License. For all licensing
	information, please see the
	LICENSE.txt document included in this
	distribution.

*********************************************/

// Require config file
require('../config.php');
require(ABSPATH .'/Sources/Core.php');

# Process post/page creation
if(isset($_POST['publish'])) {
	# Grab data from form and escape the text
	$title = sqlite_escape_string($_POST['title']);
	$text = sqlite_escape_string($_POST['text']);
	$date = time();
	$author = sqlite_escape_string(userFetch('realname', 'r'));
	# Insert post data
	if($_POST['type'] == 'post') {
	 	$dbh->query("INSERT INTO posts (title,post,date,author) VALUES('".$title."','".$text."','".$date."','".$author."')") or die(sqlite_error_string($dbh->lastError));
		# Fetch post ID from database
		$result = $dbh->query("SELECT id FROM posts WHERE date='".$date."'");
		$id = $result->fetchSingle();
		# Return full url to post to jQuery
		echo bloginfo('url', 'r')."post.php?id=".$id;
		# Unset variables
		unset($result, $id);
	}
	# insert page data
	elseif($_POST['type'] == 'page') {
		$dbh->query("INSERT INTO pages (title,page) VALUES('".$title."','".$text."')") or die(sqlite_error_string($dbh->lastError));
		# Fetch page ID from database
		$result = $dbh->query("SELECT id FROM pages WHERE page='".$text."'");
		$id = $result->fetchSingle();
		# Return full url to page to jQuery
		echo bloginfo('url', 'r')."page.php?id=".$id;
		# Unset variables
		unset($result, $id);
	}
	# Prevent the rest of the page from loading
	die();
}

# Process registration
if(isset($_POST['processregistration'])) {
	# Initiate MathValidator
	require(ABSPATH .'/Sources/MathValidator.php');
	$mv = new MathValidator;
	# Generate and set salt
	$salt = substr(md5(uniqid(rand(), true)), 0, 9);
	# Set and escape all variables for easy access
	$username = sqlite_escape_string($_POST['username']);
	$password = md5($salt.$_POST['password']);
	$email = sqlite_escape_string($_POST['email']);
	$dname = sqlite_escape_string($_POST['dname']);
	$ip = sqlite_escape_string($_SERVER['REMOTE_ADDR']);
	$arians = (int)$_POST['arians'];
	# Check math answer
	if($mv->checkResult($arians, $_SESSION['mathvalidator_c']) == false) { echo "Incorrect answer!"; }
	# Insert into database
	$dbh->query("INSERT INTO users (username,password,email,displayname,role,ip,salt) VALUES('".$username."', '".$password."', '".$email."', '".$displayname."', 0, '".$ip."', '".$salt."')");	
	# Kill this file so jQuery can finish
	die();
}

?>