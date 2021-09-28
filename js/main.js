$(document).ready(function () {
    $("#tab li").click(function () {
        $(this).toggleClass("active").siblings().removeClass("active");
        let _href = $(this).attr("href");
        $(_href).show().siblings().hide();
    });
    let _form = $("#form");
    if (_form.length) {
        let table = $("#example").DataTable({
            columnDefs: [{ targets: [8, 9, 10, 11, 12, 13, 14, 15], visible: false }],
            scrollX: true,
            responsive: true,
        });

        _form
            .on("click", "#submit", function () {
                table.columns().every(function () {
                    let _colum = this,
                        _index = _colum.index(),
                        _field = _form.find("[data-column-id=" + _index + "]");
                    if (_field.length && _field.val().trim().length) {
                        _colum.search(_field.val().trim());
                    }
                });

                table.draw();
            })
            .on("click", "#reset", function () {
                table.columns().search("").draw();
            });

        $("#header").on("click", ".alphabet", function () {
            $(this).toggleClass("active");
            $(this).siblings().removeClass("active");
            if ($(this).hasClass("active")) {
                let _text = $(this).text();
                table
                    .columns(0)
                    .search("^" + _text + ".*", true, true, false)
                    .draw();
            } else {
                table.columns(0).search("").draw();
            }
        });

        $("#select-tab").on("change", "select", function () {
            value = $(this).val();
            table.columns().every(function () {
                let _colum = this,
                    _index = _colum.index(),
                    _field = $("#select-tab").find("[data-column-id=" + _index + "]");
                if (_field.length && _field.val().trim().length) {
                    _colum.search(_field.val().trim());
                }
                if (value == "") {
                    table.columns().search("");
                }
            });
            table.draw();
        });
    }
    let _slick;
    $(window).stop().resize(function () {
            let _timeout = setTimeout(function(){
                if ($(window).width() <= 900) {
                    if( ! _slick ){
                        _slick = 1;
                        $("#list-alphabet").slick({
                            infinite: true,
                            slidesToShow: 10,
                            slidesToScroll: 3,
                            responsive: [
                                {
                                    breakpoint: 426,
                                    settings: {
                                        slidesToShow: 5,
                                        slidesToScroll: 3,
                                        infinite: true,
                                    },
                                },
                            ],
                        });
                        
                    }
                }else{
                    if( _slick ){
                        _slick = null;
                        $("#list-alphabet").slick('unslick');
                    }
                }

                clearTimeout( _timeout );
            }, 500);            
        })
        .trigger("resize");
});
