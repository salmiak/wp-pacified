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
        printf('<div class="strip" id="strip%s" data-storyslug="%s" data-storyname="%s" data-storydesc="%s" data-background="%s">', $post->ID, pac_get_storyline($post->ID)->slug, pac_get_storyline($post->ID)->name, pac_get_storyline($post->ID)->description, get_field('background', $post->ID));

        the_webcomic('large', 'self');
        echo '</div>';
			endwhile;
		endif;

		$webcomics->rewind_posts();
    ?>

    <div class="strip" id="strip_newsletter" data-storyslug="_newsletter" data-storyname="Newsletter" data-storydesc="Signup below!">

      <!-- Begin MailChimp Signup Form -->
      <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
      <div id="mc_embed_signup">
      <form action="//pacifierscomic.us13.list-manage.com/subscribe/post?u=8da07976e650dd20b7a092da0&amp;id=a241bed3c0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
      	<label for="mce-EMAIL">Subscribe to our newsletter</label>
      	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
          <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_8da07976e650dd20b7a092da0_a241bed3c0" tabindex="-1" value=""></div>
          <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
          </div>
      </form>
      </div>

      <!--End mc_embed_signup-->

    </div>

    <?php if ( have_posts() && !is_home() ) { the_post(); ?>
    <script>
      pacified_start_id = 'strip<?php echo $post->ID; ?>';
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
    </script>
    <?php }

    wp_deregister_script('pacifiedjs');
    wp_register_script('pacifiedjs', get_stylesheet_directory_uri() ."/assets/pacified-webcomics.js", false, false, true);
    wp_enqueue_script('pacifiedjs');

    ?>

</div>


<?php get_footer(); ?>
