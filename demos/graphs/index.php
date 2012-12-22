<?php
	$widthOne = rand(20,100);
	$widthTwo = rand(20,100);
	$widthThree = rand(20,100);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	
	<title>CSS bar charts&mdash;styling data with CSS3 and progressive enhancement</title>

	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<style type="text/css">
		#data-one{
			width:<?php echo $widthOne; ?>%;
		}
		#data-two{
			width:<?php echo $widthTwo; ?>%;
		}
		#data-three{
			width:<?php echo $widthThree; ?>%;
		}
		#data-one{
			-webkit-animation-name:bar-one;
		}
		#data-two{
			-webkit-animation-name:bar-two;
		}
		#data-three{
			-webkit-animation-name:bar-three;
		}
		#data-one,#data-two,#data-three{
			-webkit-animation-duration:0.5s;
			-webkit-animation-iteration-count:1;
			-webkit-animation-timing-function:ease-out;
		}
		@-webkit-keyframes bar-one{
			0%{
				width:0%;
			}
			100%{
				width:<?php echo $widthOne; ?>%;
			}
		}
		@-webkit-keyframes bar-two{
			0%{
				width:0%;
			}
			100%{
				width:<?php echo $widthTwo; ?>%;
			}
		}
		@-webkit-keyframes bar-three{
			0%{
				width:0%;
			}
			100%{
				width:<?php echo $widthThree; ?>%;
			}
		}
	</style>
</head>
<body id="home">
	<div id="wrapper">
		<dl id="chart">
			<dt>Sales increase</dt>
			<dd><span id="data-one"><?php echo $widthOne; ?>%</span></dd>
			<dt>Revenue increase</dt>
			<dd><span id="data-two"><?php echo $widthTwo; ?>%</span></dd>
			<dt>Profit increase</dt>
			<dd><span id="data-three"><?php echo $widthThree; ?>%</span></dd>
		</dl>
		<p style="padding:10px 0;clear:both;"><a href="?">Refresh page</a>. <a href="http://csswizardry.com/2010/02/css-bar-charts-styling-data-with-css3-and-progressive-enhancement">Return to main article</a></p>
	</div>
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
