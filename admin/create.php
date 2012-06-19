<?php session_start();

/*********************************************

	LightBlog 0.9
	SQLite blogging platform

	admin/create.php

	�2008-2012 The LightBlog Team. All
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
elseif((int)$_GET['type'] == 3) { $type = 'category'; }

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Create <?php echo ucwords($type) ?> - <?php bloginfo('title') ?></title>
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('url') ?>admin/style/style.css" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('url') ?>Sources/CLEditor/jQuery.CLEditor.css" />
	<!--[if lte IE 7]><style type="text/css">html.jqueryslidemenu { height: 1%; }</style><![endif]-->
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/jQuery.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/jQuery.SlideMenu.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/CLEditor/jQuery.CLEditor.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/CLEditor/jQuery.CLEditor.XHTML.js"></script>
	<script type="text/javascript" src="<?php bloginfo('url') ?>Sources/CLEditor/jQuery.CLEditor.AdvancedTable.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#wysiwyg').cleditor({width: 465, height: 300});
		});
		$(function() {
			$('#create').submit(function() {
				$('#notifybox').slideUp('normal').empty();
	var inputs = [];
	$('.cf', this).each(function() {
					if($(this).is(':checkbox') && $(this).is(':not(:checked)')) {
									void(0);
					}
					else {
									inputs.push(this.name + '=' + this.value);
					}
	});

	jQuery.ajax({
					data: inputs.join('&'),
					type: "POST",
					url: $(this).attr('action'),
					timeout: 2000,
					error: function() {
						$('#notifybox').text('Failed to submit <?php echo $type; ?>.').css("background","#E36868").css("border-color","#a40000").slideDown("normal");
					},
					dataType: 'json',
					success: function(r) {
						if(r.result == 'success') {
							if(r.showlink == true) {
								$('#notifybox').html('<?php echo ucwords($type) ?> created. | <' + 'a href="' + r.response + '">View <?php echo $type ?></' + 'a>').slideDown("normal");
							}
							else {
								$('#notifybox').html('<?php echo ucwords($type) ?> created.').slideDown("normal");
							}
							$('#title').val('');
							$('#wysiwyg').cleditor()[0].clear();
						}
						else {
							$('#notifybox').text('Failed to submit <?php echo $type; ?>; ' + r.response).css("background","#E36868").css("border-color","#a40000").slideDown("normal");
						}
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
			<?php if($type !== 'category' && permissions(1) || $type === 'category' && permissions(2)): if(!isset($type)): ?>
			<p>The type of content to add was not specified. You must have taken a bad link. Please
			use the navigation bar above to choose the correct type.</p>
			<?php else: ?>
			<h2 class="title"><img class="textmid" src="style/create.png" alt="" />Add New <?php echo ucwords($type) ?></h2>
			<div id="notifybox"></div>
			<form action="<?php bloginfo('url') ?>Sources/ProcessAJAX.php" method="post" id="create">
				<div style="float:left;width:480px;margin-top:3px;">
					<label class="tfl" for="title">Title</label>
					<input id="title" class="textfield cf" name="title" type="text" title="Title" /><br />
					<label class="tfl" for="wysiwyg"><?php echo $type == 'category' ? 'Info' : 'Body'; ?></label>
					<textarea class="cf" rows="12" cols="36" name="text" id="wysiwyg"></textarea><br />
					<input class="cf" type="hidden" name="type" value="<?php echo $type ?>" />
					<input class="cf" type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>" />
				</div>
				<div class="settings" style="float:left;width:170px;margin:19px 0 10px;padding:15px;">
					<?php if($type == 'post'): ?>
						<label for="category">Category:</label><br />
						<select class="cf" id="category" name="category">
							<?php list_categories('option', null) ?>
						</select><br /><br />
						<label for="comments">Comments on?</label>
						<input class="cf" type="checkbox" name="comments" id="comments" checked="checked" value="1" /><br />
					<?php endif; if($type != 'category'): ?>
						<label for="published">Published?</label>
						<input class="cf" type="checkbox" name="published" id="published" checked="checked" value="1" /><br /><br />
					<?php endif; ?>
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
