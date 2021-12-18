$(document).on('click', '.btn-buy-now', function (e) {
    e.preventDefault();

    if ($(this).hasClass('disable')) {
        return false;
    }

    $(document).find('.btn-buy-now').addClass('disable');
    var self = $(this);
    var parent = $(this).parents('.card__product');

    var src = parent.find('img').attr('src');
    console.log(src);
    var cart = $(document).find('#cart-shop');

    var parTop = parent.offset().top;
    var parLeft = parent.offset().left;
    $('<img />', {
        class: 'img-product-fly',
        src: src
    }).appendTo('body').css({
        'top': parTop,
        'left': parseInt(parLeft) + parseInt(parent.width()) - 50,
        'z-index': '100',
        'position': 'absolute',
        'width': '50px',
        'height': '50px',
        'border-radius': '50%',

        'transition': 'all 0.5s linear'

    });

    setTimeout(function () {
        $(document).find('.img-product-fly').css({
            'top': cart.offset().top,
            'left': cart.offset().left,
            'z-index': '100',
            'width': '30px',
            'height': '30px',
            'border-radius': '50%',

            'transition': 'all 0.5s linear'


        });
        $(document).find('#cart-shop').css({
            'transform': 'translateY(8px)',
            'transition': 'all 0.5s linear'
        })
        setTimeout(function () {
            $(document).find('.img-product-fly').remove();
            $(document).find('#cart-shop').css({
                'transform': 'translateY(0)',
                'transition': 'all 0.5s linear'
            })

            // var citem = parseInt(cart.find('#count-item').data('count')) + 1

            // swal("Bạn đã thêm thành công", {
            //     customClass: "null",
            //     icon: "success",
            // });
            $(document).find('.btn-buy-now').removeClass('disable');

        }, 1000);
    }, 700);
});

