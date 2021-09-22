$(document).on('click', '.btn-buy-now', function (e) {
    e.preventDefault();
    if ($(this).hasClass('disable')) {
        return false;
    }

    $(document).find('.btn-buy-now').addClass('disable');
    var self = $(this);
    var parent = $(this).parents('.card__product');
    var src = parent.find('img').attr('src');
    var cart = $(document).find('#cart-shop');

    var parTop = parent.offset().top;
    var parLeft = parent.offset().left;
    $('<img />', {
        class: 'img-product-fly',
        src: src
    }).appendTo('body').css({
        'top': parTop,
        'left': parseInt(parLeft) + parseInt(parent.width()) - 50
    });

    setTimeout(function () {
        $(document).find('.img-product-fly').css({
            'top': cart.offset().top,
            'left': cart.offset().left

        });

        setTimeout(function () {
            $(document).find('.img-product-fly').remove();
            // var citem = parseInt(cart.find('#count-item').data('count')) + 1

            swal("Bạn đã thêm thành công", {
                customClass: "null",
                icon: "success",
            });
            $(document).find('.btn-buy-now').removeClass('disable');

        }, 1000);
    }, 500);
});