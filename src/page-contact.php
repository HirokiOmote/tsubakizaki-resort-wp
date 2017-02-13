<?php
    get_header();
?>

<div id="content">
  <div class="containerContact">
    <div class="blockPrivacyPolicy">
      お返事は基本的にご入力頂きましたメールにていたしますが、お電話でのお返事を希望される場合は、電話番号欄に電話番号をご入力ください。また、住所の入力も「椿崎リゾートの資料が必要」な場合にご入力下さい。このお問い合せにより得た、メールアドレスなどの個人情報は、このお問い合せにお応えするだけに利用いたします。第三者に提供したり、弊社からの営業に利用することは一切ありませんので、ご安心ください。<br><br>
      <span>※</span>は必須です。
    </div>
    <div class="Form">
      <?php the_post(); the_content(); ?>
    </div>
  </div>
</div>

<?php get_footer(); ?>
