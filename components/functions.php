<?php

// show errors if root domain is localhost
if( $_SERVER[SERVER_NAME] == 'localhost' ) {
  error_reporting(-1);
} else {
  error_reporting(0);
}

add_theme_support('menus');
add_theme_support('post-thumbnails');

?>
