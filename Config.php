<?php
/*************************************************

  LightBlog - PHP SQLite blogging platform
  Copyright 2008 soren121.
  
  This software is released under the GNU
  General Public License version 3. For more
  accurate licensing information, please see
  the LICENSE.txt file included in this
  distribution.
  
  Config.php
  
*************************************************/

// We can't let you access it directly :)
if(!defined('Lighty')) {
	die("Hacking Attempt...");
}

// Path settings for LightBlog folders
// These should have been setup during installation
$sources_dir = ''; # Path to your Source directory with trailing /
$theme_dir = ''; # Path to your Themes directory with trailing /
$language_dir = ''; # Path to your Languages directory with trailing /
$cmsurl = ''; # URL to your LightBlog Installation

// Don't touch this!
$lighty_installed = false;
?>