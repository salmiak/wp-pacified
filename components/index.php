<?php get_header(); ?>


<div id="MainContent">

    <?php
    $webcomics = new WP_Query(array(
			'order' => 'ASC',
			'post_type' => get_webcomic_collections(),
			'posts_per_page' => 10
		));

    if ($webcomics and $webcomics->have_posts()) :
			while ($webcomics->have_posts()) : $webcomics->the_post();
        printf('<div class="strip" id="%s">', $post->post_name);
        the_webcomic('large', 'self');
        echo '</div>';
			endwhile;
		endif;

		$webcomics->rewind_posts();
    ?>

</div>


<?php get_footer(); ?>
