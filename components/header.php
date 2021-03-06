<!DOCTYPE html>
  <html <?php language_attributes(); ?>>
  <head>

    <!--

      Welcome to the source of this site -
      I built this: Salmiak media (http://salmiakmedia.se)

    -->

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes" />

    <title><?php wp_title('&raquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>

    <link rel="icon" href="<?php bloginfo('template_url'); ?>/assets/img/favicon.png" type="image/png">

    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

    <?php wp_head(); ?>

  </head>

  <body <?php body_class(); ?>>

    <div class="loading"><div>
      <img src="<?php bloginfo('template_url'); ?>/assets/img/logo.svg" />
    </div></div>

    <header>
      <hgroup class="topHeader">
        <h1><a href="<?php bloginfo('url'); ?>" title="<?php bloginfo('name'); ?> - <?php bloginfo( 'description' ); ?>"><?php bloginfo( 'name' ); ?></a></h1>

        <nav>
          <?php wp_nav_menu( 'sort_column=menu_order' ); ?>
        </nav>
      </hgroup>

      <?php if( !is_page() ) {?>
        <hgroup class="subHeader">
          <div class="pull-right" id="StoryDescription"></div>
          <a href id="StoryStartLink"><span id="StoryLabel"></span> <span class="ion-ios-skipbackward"></span></a>
        </hgroup>
      <?php } else { ?>
        <hgroup class="subHeader"></hgroup>
      <?php } ?>
      <a href="http://pacifierscomic.tictail.com/" class="shop-badge">
        Buy The Comic Book from<br/>
        <span>The Pacifiers Store</span>
      </a>
    </header>
