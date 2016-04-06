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
        printf('<div class="strip" id="strip%s" data-storyslug="%s" data-storyname="%s">', $post->ID, pac_get_storyline($post->ID)->slug, pac_get_storyline($post->ID)->name);

        the_webcomic('large', 'self');
        echo '</div>';
			endwhile;
		endif;

		$webcomics->rewind_posts();
    ?>

    <?php if ( have_posts() && !is_home() ) { the_post(); ?>
    <script>
      pacified_start_id = 'strip<?php echo $post->ID; ?>';
      console.log('l: ' + pacified_start_id);
    </script>
    <?php } elseif ( is_home() ) { ?>
    <script>

      var getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
      }

      pacified_start_id = getCookie('pac_lastVisited');
      console.log('c: ' + pacified_start_id);
    </script>
    <?php } ?>

</div>


<?php get_footer(); ?>
