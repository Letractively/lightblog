<?php

// let's stop them hackers =)
if(!defined("Light")) {
	die("DIE!");
}

// Settings grabber
$stselect = sqlite_query($handle, "SELECT * FROM coreinfo") or die("SQLite query error: code 02<br>".sqlite_error_string(sqlite_last_error($handle)));
	while($row = sqlite_fetch_array($stselect)) {
		$cmsinfo[$row['variable']] = stripslashes(stripslashes($row['value']));
	}
	
// Site URL grabber
$site_url = $cmsinfo['site_url'];

// Gravatar retrieval	
$grav_default=$site_url."admin/style/gravatar.gif";
$gravatar = "http://www.gravatar.com/avatar.php?gravatar_id=".md5($_SESSION['email'])."&amp;default=".urlencode($grav_default)."&amp;size=60";
?>