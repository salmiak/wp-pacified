<?php get_header(); ?>


<div id="MainContent">
  <div class="clipbox">

    <!--<div class="strip stripPrev">
      <img src="<?php bloginfo('template_url'); ?>/assets/img/mock1.png" class="stripImg" />
    </div>

    <div class="strip stripActive">
      <img src="<?php bloginfo('template_url'); ?>/assets/img/mock2.png" class="stripImg" />
    </div>

    <div class="strip stripNext">
      <img src="<?php bloginfo('template_url'); ?>/assets/img/mock3.png" class="stripImg" />
    </div>-->

    <?php
    $webcomics = new WP_Query(array(
			'order' => 'ASC',
			'post_type' => get_webcomic_collections(),
			'posts_per_page' => 10
		));

    if ($webcomics and $webcomics->have_posts()) :
			while ($webcomics->have_posts()) : $webcomics->the_post();
        echo '<div class="strip">';
        the_webcomic('large', 'self');
        echo '</div>';
			endwhile;
		endif;

		$webcomics->rewind_posts();
    ?>

  </div>
</div>


<?php get_footer(); ?>
