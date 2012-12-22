<?php
if(isset($_GET['pageID'])){
	$pageID = $_GET['pageID'];
}
else{
	$pageID = 'payment';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Progress</title>
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>

<body id="<?php echo $pageID; ?>-page">
	
	<ol id="progress">
		<li class="details-step">
			<a href="#">
			<span>Your details</span> 
			Name, email, address.
			</a>
		</li>
		<li class="account-step">
			<a href="#">
			<span>Create account</span> 
			Username and custom URL.
			</a>
		</li>
		<li class="products-step">
			<a href="#">
			<span>Product options</span> 
			Choose your package.
			</a>
		</li>
		<li class="payment-step">
			<a href="#">
			<strong>
			<span>Payment</span> 
			PayPal, or credit card.
			</strong>
			</a>
		</li>
		<li class="go-step">
			<a href="#">
			<span>Go!</span> 
			Start using OurService&trade;
			</a>
		</li>
	</ol>
	
	<p style="clear:both;"><a href="http://csswizardry.com/2010/11/mark-up-a-semantic-accessible-progressively-enhanced-mobile-optimised-progress-bar-bonus-style-the-numbers-in-an-ordered-list">Back to main article.</p>

	<script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script type="text/javascript">
		try {
		var pageTracker = _gat._getTracker("UA-1856861-4");
		pageTracker._trackPageview();
		} catch(err) {}
	</script>
</body>
</html>