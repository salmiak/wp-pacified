<?php get_header(); ?>

<?php if (have_posts()) :
	while (have_posts()) :
	the_post(); ?>

    <article class="post" id="post-<?php the_ID(); ?>">
      <h2 class="post-title"><a href="<?php the_permalink(); ?>">
				<?php the_title(); ?></a>
			</h2>

			<div class="clear"></div>


      <p>
				<?php echo get_the_excerpt() ?>
				<a href="<?php the_permalink()?>" class="post-link" style="white-space: nowrap">Read more</a>
      </p>

    </article>

	<?php endwhile; ?>

	<div class="page-nav">
	  <div class="page-nav-previous pull-right"><?php next_posts_link( 'Older posts >' ); ?></div>
		<div class="page-nav-next pull-left"><?php previous_posts_link( '< Newer posts' ); ?></div>
	</div>

</div>

<?php else : ?>

	  <div class="container container-center text-center">
	    <h4>404</h4>
	    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/error.png" width="128" style="margin-bottom: 10px" />
	    <p class="lead">The page you're looking for isn't here.</p>
	    <p>Did we send you here? Please <a href="mailto:support@brisk.io" class="text-white">tell us</a>.</p>
	  </div>

<?php endif; ?>

</div>

<?php get_footer(); ?>
