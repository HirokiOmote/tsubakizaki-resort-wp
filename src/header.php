<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Astrid
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div class="preloader">
<div class="preloader-inner">
	<ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
</div>
</div>

<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'astrid' ); ?></a>

	<div id="masthead" class="site-header <?php echo astrid_has_header(); ?>" role="banner">
		<div class="container">
			<div class="site-branding col-md-4 col-sm-6 col-xs-12">
				<!-- <?php astrid_branding(); ?> -->
			</div>
			<div class="btn-menu col-md-8 col-sm-6 col-xs-12"><i class="fa fa-navicon"></i></div>
			<nav id="mainnav" class="main-navigation col-md-8 col-sm-6 col-xs-12" role="navigation">
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
			</nav><!-- #site-navigation -->
		</div>
	</div><!-- #masthead -->

	<header class="GlobalHeader">
    <?php if ( is_page("contact") ): ?>
      <h1><img src="<?php echo get_stylesheet_directory_uri();?>/images/contact/ttl_contact.svg" alt="お問い合わせ"></h1>
    <?php else: ?>
			<h1><img src="<?php echo get_stylesheet_directory_uri();?>/images/common/img_logoWhite.svg" alt="椿崎リゾート"></h1>
		<?php endif; ?>
  </header>

	<?php if ( !is_page_template('page-templates/page_widgetized.php') ) : ?>
		<?php $container = 'container'; ?>
	<?php else : ?>
		<?php $container = 'home-wrapper'; ?>
	<?php endif; ?>

	<?php do_action('astrid_before_content'); ?>

	<div id="content" class="site-content">
		<div class="<?php echo $container; ?>">
