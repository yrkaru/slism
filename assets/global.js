jQuery(".flexnav").flexNav();

jQuery(document).ready(function ($) {
  jQuery(".filter-menu-item-wrapper select.filter-menu").on('change', function (e) {
    var values = {};
    values['action'] = 'filter-taxonomy';
    jQuery(".filter-menu-item-wrapper select.filter-menu").each(function () {
      values['post-type'] = jQuery(this).data('post-type');
      values[jQuery(this).data('type')] = jQuery(this).eq(0).val() ? jQuery(this).eq(0).val().match(/\d+/)[0] : 0;
    });

    var container = '.ajax-container > .container > .row';
    jQuery.ajax({
      url: ajaxurl,
      type: 'post',
      dataType: "html",
      data: values,
      beforeSend: function () {
        jQuery(container).html('<div class="col-sm-12"><div class="page-content" id="loader">Loading Resources...</div></div>');
      },
      success: function (html) {
        console.log(html);
        jQuery(container).html(html);

      },
    });

  });
});

jQuery(document).ready(function () {


  jQuery('.tabs .tab').on('touch click', function () {

    var band_id = jQuery(this).parents('.band-tabs').data('band-id');

    jQuery('#band-' + band_id + ' .tabs .tab').removeClass('selected');
    jQuery(this).addClass('selected');
    jQuery('#band-' + band_id + ' .content-tab').removeClass('selected');
    jQuery('#band-' + band_id + ' #content-' + jQuery(this).attr('id')).addClass('selected');

  });

});

jQuery(window).scroll(function ($) {
  var shrinkOn = 275;
  var y_scroll_pos = window.pageYOffset;
  var scroll = jQuery(window).scrollTop();

  if (y_scroll_pos > shrinkOn) {
    jQuery("header").addClass('smaller');
  } else {
    jQuery("header").removeClass('smaller');
  }

});



jQuery('.team-member-wrapper p a, .team-member-grid-wrapper p a').on('click', function (e) {
  e.preventDefault();
  jQuery('#team-member-modal').modal('show');
  var loader = jQuery("#fancybox-loading");

  var id = jQuery(this).parents('.team-member-wrapper, .team-member-grid-wrapper').find('h3.title').data("id");
  var url = '/descriptions/' + id + '.html';

  jQuery.ajax({
    url: url,
    type: 'get',
    beforeSend: function () {
      jQuery(loader).show();
    },
    success: function (data) {
      var g_modal = jQuery("#team-member-modal .modal-body");
      var content = '<div class="close" data-bs-dismiss="modal" aria-label="Close"></div>' + data;
      jQuery(g_modal).html(content)

      jQuery(loader).hide();
    }
  });
});

jQuery('a.author-title').on('click', function (e) {
  e.preventDefault();
  jQuery('#team-member-modal').modal('show');
  var loader = jQuery("#fancybox-loading");
  jQuery.ajax({
    url: ajaxurl,
    type: 'post',
    data: {
      action: 'team_member',
      id: jQuery(this).data("id"),
    },
    beforeSend: function () {
      jQuery(loader).show();
    },
    success: function (data) {
      var g_modal = jQuery("#team-member-modal .modal-body");
      jQuery(g_modal).html(data)

      jQuery(loader).hide();
    }
  });
});