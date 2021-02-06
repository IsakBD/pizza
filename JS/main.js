$(document).ready(function () {
    let error_input = $('.error-input');
    error_input.hide();

    let success_order = $('#success_order');

    let order_form = $('#order-form');

    //Local Storage:
    $('.cookie-close').click(function () {
        $('#cookie').hide();
        localStorage.setItem('cookieHide', '1');
    });

    let cookieHide = localStorage.getItem('cookieHide');
    if (!cookieHide) {
        $('#cookie').show();
    }

    $('.product-button').click(function (event) {
        let productTItle = $(event.target).siblings('.product-title').text().trim();
        let cartArray = [];
        let cart = localStorage.getItem('cart');
        if (cart) {
            cartArray = JSON.parse(cart);
        }
        cartArray.push(productTItle);
        localStorage.setItem('cart', JSON.stringify(cartArray));
        console.log(localStorage);
    });

    $('#ordering_button').click(function () {
            // $(document).on('click', '#ordering_button', function(){
            let name = $('#name');
            let address = $('#address');
            let phone_number = $('#phone_number');

            let is_success = true;

            if (!name.val()) {
                is_success = false;
                name.siblings('.error-input').show();
                name.addClass('error');
            } else {
                name.siblings('.error-input').hide();
                name.removeClass('error');
            }

            if (!address.val()) {
                is_success = false;
                address.siblings('.error-input').show();
                address.addClass('error');
            } else {
                address.siblings('.error-input').hide();
                address.removeClass('error');
            }

            if (!phone_number.val()) {
                is_success = false;
                phone_number.siblings('.error-input').show();
                phone_number.addClass('error');
            } else {
                phone_number.siblings('.error-input').hide();
                phone_number.removeClass('error');
            }

            if (is_success) {
                $('#loader').css({'display': 'flex'});
                $.ajax({
                    method: "POST",
                    url: 'https://itlogia.ru/test/checkout',
                    data: {name: name.val(), phone_number: phone_number.val(), address: address.val()}
                })
                    .done(function (message) {
                        $('#loader').css({'display': 'none'});
                        console.log(message.success);
                        if (message.success) {
                            order_form.hide();
                            success_order.css('display', 'flex');
                        } else {
                            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                        }
                    });


                // $.ajax({
                //     method: 'POST',
                //     url: 'https://itlogia.ru/test/checkout',
                //     data: {name: name.val(), phone_number: phone_number.val(), address: address.val()},
                //     beforeSend: function() {
                //         $('#loader').css({'display': 'flex'});
                //     },
                //     success: function(message) {
                //         $('#loader').css({'display': 'none'});
                //         console.log(message.success);
                //         if (message.success) {
                //             order_form.hide();
                //             success_order.css('display', 'flex');
                //         } else {
                //             alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                //         } 
                //     }
                // });
            }
        }
    )
})
;