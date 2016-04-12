<?php get_header(); ?>


<div id="MainContent">

  <div class="container bg-white">

    <?php
    if ( have_posts() ) {
    	while ( have_posts() ) {
    		the_post(); ?>

        <h1><?php the_title(); ?></h1>
        <?php the_content(); ?>

    	<?php
      } // end while
    } // end if
    ?>
    
  </div>

</div>


<?php get_footer(); ?>
