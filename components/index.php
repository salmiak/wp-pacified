<?php get_header(); ?>

	<div id="main">

		<!-- starta loopen -->
		<?php while ( have_posts() ) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    		<header class="post-header">
    			<h3 class="post-title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permalänk till <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h3>

    			<div class="post-meta">
    				<small>Published <?php the_time('j F, Y') ?> by <?php the_author_posts_link() ?></small>
    			</div><!-- slut post-meta -->
    		</header>

    		<?php if ( is_archive() || is_search() ) : // Visa bara ett utdrag på arkiv- och sök-sidorna ?>
    		<div class="post-utdrag">
    			<?php the_excerpt( __( 'Read more' ) ); ?>
    		</div><!-- slut post-utdrag -->
    		<?php else : ?>

    		<div class="post-content">
    			<?php the_content( __( 'Read more' ) ); ?>
    			<?php wp_link_pages(); ?>
    		</div><!-- slut post-content -->
    		<?php endif; ?>

    		<footer class="post-meta">
    			<small>Categorised under <?php the_category(', '); ?> <?php the_tags('med etiketterna: ', ', '); ?> with <?php comments_popup_link( __( 'no comments' ), __( '1 comment' ), __( '% comments' ) ); ?></small>
    			<?php edit_post_link( __( 'Edit post' ), ' | ' ); ?>
    		</footer>
    	</article>

		<?php comments_template(); ?>

		<?php endwhile; ?>

		<?php if (  $wp_query->max_num_pages > 1 ) : ?>
		<nav id="nav-nedan">
    		<div class="nav-fore"><?php next_posts_link( __( '← Older posts' ) ); ?></div>
    		<div class="nav-efter"><?php previous_posts_link( __( 'Newer posts →' ) ); ?></div>
    	</nav><!-- slut nav-nedan -->

		<?php endif; ?><!-- avsluta loopen -->

	</div><!-- slut main -->

<?php get_footer(); ?>
