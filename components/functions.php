<?php

// show errors if root domain is localhost
if( $_SERVER[SERVER_NAME] == 'localhost' ) {
  error_reporting(-1);
} else {
  error_reporting(0);
}

//------------------------------------------------------
//  Activate the menu functions in wordpress
//------------------------------------------------------

add_theme_support( 'menus' );


//------------------------------------------------------
//  Activate widgets
//------------------------------------------------------

if ( function_exists('register_sidebar') )
	register_sidebar(array(
	'before_widget' => '<section>',
	'after_widget' => '</section>',
	'before_title' => '<h4>',
	'after_title' => '</h4>',
));

//------------------------------------------------------
//  Add Stylesheet
//------------------------------------------------------

if ( !is_admin() ) {
  wp_deregister_style('pacifiedjs');
  wp_register_style( 'pacifiedcss', get_stylesheet_directory_uri() ."/assets/style.css" );
  wp_enqueue_style('pacifiedcss');
}

//------------------------------------------------------
//  Add Javascript
//------------------------------------------------------

wp_deregister_script('pacifiedjs');
wp_register_script('pacifiedjs', get_stylesheet_directory_uri() ."/assets/pacified.js", false, false, true);
wp_enqueue_script('pacifiedjs');

//------------------------------------------------------
//  Add jQuery from Google
//------------------------------------------------------

if (!is_admin()) {
	wp_deregister_script('jquery');
	wp_register_script('jquery', ("//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"), false);
	wp_enqueue_script('jquery');
}


//------------------------------------------------------
//  Remove some rubrish from head
//------------------------------------------------------

remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);


//------------------------------------------------------
//  Add Google Analytics in footer, change UA-XXXXX-X
//------------------------------------------------------
/*
function add_google_analytics() {
	echo '<script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>';
	echo '<script type="text/javascript">';
	echo 'var pageTracker = _gat._getTracker("UA-XXXXX-X");';
	echo 'pageTracker._trackPageview();';
	echo '</script>';
}
add_action('wp_footer', 'add_google_analytics');
*/

?>
