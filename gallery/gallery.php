<?php
    $arr = array ("/img/random1.jpg",
	"img/random2.jpg",
	"img/random3.jpg",
	"img/random4.jpg",
	"img/random5.jpg",
	"img/random6.jpg",
	"img/random7.jpg",
	"img/random8.jpg",
	"img/random9.jpg",
	"img/random10.jpg",
	"img/random11.jpg"
	);
	shuffle($arr);
    echo json_encode($arr);
?>