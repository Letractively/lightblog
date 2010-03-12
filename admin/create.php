<?php session_start();

/*********************************************

	LightBlog 0.9
	SQLite blogging platform
	
	admin/create.php
	
	�2009-2010 The LightBlog Team. All 
	rights reserved. Released under the 
	GNU General Public License 3. For 
	all licensing information, please 
	see the LICENSE.txt document 
	included in this distribution.
	
*********************************************/

// Require config file
require('../config.php');
require(ABSPATH .'/Sources/Core.php');
require(ABSPATH .'/Sources/Admin.php');

if((int)$_GET['type'] == 1) { $type = 'post'; }
elseif((int)$_GET['type'] == 2) { $type = 'page'; }

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>Create <?php echo ucwords($type) ?> - <?php bloginfo('title') ?></title>
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('url') ?>admin/style/style.css" />
	<!--[if lte IE 7]><style type="text/css">html.jqueryslidemenu { height: 1%; }</style><![endif]-->
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/jQuery.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/jQuery.SlideMenu.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/jQuery.Corners.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/jQuery.InputHint.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/nicEdit.js"></script> 
	<script type="text/javascript">	
		$(document).ready(function(){
			$('.rounded').corner(); 
			$('.roundedt').corner("round top 10px"); 
			$('.roundedb').corner("round bottom 10px");
			$('.hint').hint();
			new nicEditor({iconsPath:'<?php bloginfo('url') ?>Sources/nicEditorIcons.gif',xhtml:true}).panelInstance('wysiwyg');
		});
		$(function() {
			$('#create').submit(function() {
				$('#notifybox').slideUp('normal').empty();
				var inputs = [];
				var wysiwygtext = nicEditors.findEditor('wysiwyg').getContent();
				$('.cf', this).each(function() {
					inputs.push(this.name + '=' + escape(this.value));
				})
				$('#wysiwyg', this).each(function() {
					inputs.push(this.name + '=' + escape(wysiwygtext));
				})
				jQuery.ajax({
					data: inputs.join('&'),
					type: "POST",
					url: this.getAttribute('action'),
					timeout: 2000,
					error: function() {
						$('#notifybox').text('Failed to submit <?php echo ucwords($type) ?>.').css("background","#b20000").slideDown("normal");
						console.log("Failed to submit");
						alert("Failed to submit.");
					},
					success: function(r) {
						$('#notifybox').html('<?php echo ucwords($type) ?> created. | <' + 'a href="' + r + '">View <?php echo $type ?></' + 'a>').slideDown("normal");
						$('.hint').val('');
						nicEditors.findEditor('wysiwyg').setContent('');
					}
				})
				return false;
			})
		});
	</script>
</head>

<body>
	<div id="wrapper">
		<div id="header" class="roundedt">
			<a href="<?php bloginfo('url') ?>"><?php bloginfo('title') ?></a>	 
		</div>
		<?php include('menu.php'); ?>
		<div id="content">
			<?php if(permissions(1)): if(!isset($type)): ?>
			<p>The type of content to add was not specified. You must have taken a bad link. Please
			use the navigation bar above to choose the correct type.</p>
			<?php else: ?>
			<h2 class="title"><img class="textmid" src="style/create.png" alt="" />Add New <?php echo ucwords($type) ?></h2>
			<div id="notifybox"></div>
			<form action="<?php bloginfo('url') ?>Sources/ProcessAJAX.php" method="post" id="create">
				<div style="float:left;width:480px;">
					<input class="hint textfield cf" name="title" type="text" title="Title" /><br />
					<textarea rows="12" cols="36" name="text" id="wysiwyg"></textarea><br />
					<input class="cf" type="hidden" name="type" value="<?php echo $type ?>" />
				</div>
				<div class="settings" style="float:left;width:170px;margin:8px 0 10px;padding:15px;">
					<?php if($type == 'post'): ?>
						<label for="category">Category:</label><br />
						<select id="category">
							<option value="uncategorized">Uncategorized</option>
						</select><br /><br />
					<?php endif; ?>
					<label for="published">Published?</label>
					<input class="cf" type="checkbox" name="published" id="published" checked="checked" value="1" /><br />
					<label for="comments">Comments on?</label>
					<input class="cf" type="checkbox" name="comments" id="comments" checked="checked" value="1" /><br /><br />
					<input class="cf submit" name="create" type="submit" value="Publish" />
				</div>
				<div style="clear:both;"></div>
			</form>
			<?php endif; endif; ?>
		</div>
		<div id="footer" class="roundedb">		
			Powered by LightBlog <?php LightyVersion() ?>    
		</div>
	</div>
</body>
</html>
