/**
 * Spec - Responsive Bootstrap Admin
 * version 1.0.0
 *
 */
'use strict';

var  $document = $( document ),
$footer = $( '#footer' );

$(document).ready(function() {
        // Add special class to minimalize page elements when screen is less than 768px
        setBodySmall();
        // Check if sidebar scroll is enabled
        if ($('body').hasClass('sidebar-scroll')) {
               var navigation =  $('#navigation').slimScroll({
                        height: '100%',
                        opacity: 0.3,
                        size: 0
                });
        }
        // Handle minimalize sidebar menu
         var hidemenu = $('.hide-menu').on('click', function(event) {
                event.preventDefault();
                if ($(window).width() < 769) {
                        $("body").toggleClass("show-sidebar");
                } else {
                        $("body").toggleClass("hide-sidebar");
                }
        });
        // Initialize metsiMenu plugin to sidebar menu
        var sidemenu = $('#side-menu').metisMenu();
        // Initialize iCheck plugin
        var icheck = $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green'
        });
        // Initialize animate panel function
        var specanimation = $('.spec-animation').animatePanel();
        // Function for collapse Spec Panel
        var showhide = $('.showhide').on('click', function(event) {
                event.preventDefault();
                var specpanel = $(this).closest('div.specpanel');
                var icon = $(this).find('i:first');
                var body = specpanel.find('div.panel-body');
                var footer = specpanel.find('div.panel-footer');
                body.slideToggle(300);
                footer.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                specpanel.toggleClass('').toggleClass('panel-collapse');
                setTimeout(function() {
                        specpanel.resize();
                        specpanel.find('[id^=map-]').resize();
                }, 50);
        });
        // Function for close specpanel
        var closebox = $('.closebox').on('click', function(event) {
                event.preventDefault();
                var specpanel = $(this).closest('div.specpanel');
                specpanel.remove();
                if ($('body').hasClass('fullscreen-panel-mode')) {
                        $('body').removeClass('fullscreen-panel-mode');
                }
        });
        // Fullscreen for fullscreen specpanel
        var fullscreen = $('.fullscreen').on('click', function() {
                var specpanel = $(this).closest('div.specpanel');
                var icon = $(this).find('i:first');
                $('body').toggleClass('fullscreen-panel-mode');
                icon.toggleClass('fa-expand').toggleClass('fa-compress');
                specpanel.toggleClass('fullscreen');
                setTimeout(function() {
                        $(window).trigger('resize');
                }, 100);
        });
        // Open close left sidebar
        var leftsidebartoggle = $('.left-sidebar-toggle').on('click', function() {
                $('#left-sidebar').toggleClass('sidebar-open');
        });
        // Open close left sidebar
        var rightsidebartoggle = $('.right-sidebar-toggle').on('click', function() {
                $('#right-sidebar').toggleClass('sidebar-open');
        });
        // Function for small header
        var smallheader = $('.small-header-action').on('click', function(event) {
                event.preventDefault();
                var icon = $(this).find('i:first');
                var breadcrumb = $(this).parent().find('#hbreadcrumb');
                $(this).parent().parent().parent().toggleClass('small-header');
                breadcrumb.toggleClass('m-t-lg');
                icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
        });
        // Set minimal height of #wrapper to fit the window
        setTimeout(function() {
                fixWrapperHeight();
        });
        // Initialize tooltips
        var tooltipdemo = $('.tooltip-demo').tooltip({
                selector: "[data-toggle=tooltip]"
        });
        // Initialize popover
        var popover = $("[data-toggle=popover]").popover();
        // Move modal to body
        // Fix Bootstrap backdrop issu with animation.css
         var modal = $('.modal').appendTo("body")
});
$(window).on("resize click", function() {
        // Add special class to minimalize page elements when screen is less than 768px
        setBodySmall();
        // Waint until metsiMenu, collapse and other effect finish and set wrapper height
        setTimeout(function() {
                fixWrapperHeight();
        }, 300);
});

function fixWrapperHeight() {
        // Get and set current height
        var headerH = 62;
        var navigationH = $("#navigation").height();
        var contentH = $(".content").height();
        // Set new height when contnet height is less then navigation
        if (contentH < navigationH) {
                $("#wrapper").css("min-height", navigationH + 'px');
        }
        // Set new height when contnet height is less then navigation and navigation is less then window
        if (contentH < navigationH && navigationH < $(window).height()) {
                $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
        }
        // Set new height when contnet is higher then navigation but less then window
        if (contentH > navigationH && contentH < $(window).height()) {
                $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
        }
}

function setBodySmall() {
        if ($(this).width() < 769) {
                $('body').addClass('page-small');
        } else {
                $('body').removeClass('page-small');
                $('body').removeClass('show-sidebar');
        }
}
// Animate panel function
$.fn['animatePanel'] = function() {
        var element = $(this);
        var effect = $(this).data('effect');
        var delay = $(this).data('delay');
        var child = $(this).data('child');
        // Set default values for attrs
        if (!effect) {
                effect = 'zoomIn'
        }
        if (!delay) {
                delay = 0.05
        } else {
                delay = delay / 10
        }
        if (!child) {
                child = '.row > div'
        } else {
                child = "." + child
        }
        //Set defaul values for start animation and delay
        var startAnimation = 0;
        var start = Math.abs(delay) + startAnimation;
        // Get all visible element and set opacity to 0
        var panel = element.find(child);
        panel.addClass('opacity-0');
        // Get all elements and add effect class
        panel = element.find(child);
        panel.addClass('stagger').addClass('animated-panel').addClass(effect);
        var panelsCount = panel.length + 10;
        var animateTime = (panelsCount * delay * 10000) / 10;
        // Add delay for each child elements
        panel.each(function(i, elm) {
                start += delay;
                var rounded = Math.round(start * 10) / 10;
                $(elm).css('animation-delay', rounded + 's');
                // Remove opacity 0 after finish
                $(elm).removeClass('opacity-0');
        });
        // Clear animation after finish
        setTimeout(function() {
                $('.stagger').css('animation', '');
                $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
        }, animateTime)
};
// scrolling bar
$("#right-sidebar").wrap("<div class='scroll'></div>");
// TO DO LIST
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        completed: []
};
// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new transparent;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new transparent;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
renderTodoList();
// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function() {
        var value = document.getElementById('item').value;
        if (value) {
                addItem(value);
        }
});
document.getElementById('item').addEventListener('keydown', function(e) {
        var value = this.value;
        if (e.code === 'Enter' && value) {
                addItem(value);
        }
});

function addItem(value) {
        addItemToDOM(value);
        document.getElementById('item').value = '';
        data.todo.push(value);
        dataObjectUpdated();
}

function renderTodoList() {
        if (!data.todo.length && !data.completed.length) return;
        for (var i = 0; i < data.todo.length; i++) {
                var value = data.todo[i];
                addItemToDOM(value);
        }
        for (var j = 0; j < data.completed.length; j++) {
                var value = data.completed[j];
                addItemToDOM(value, true);
        }
}

function dataObjectUpdated() {
        localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
        var item = this.parentNode.parentNode;
        var parent = item.parentNode;
        var id = parent.id;
        var value = item.innerText;
        if (id === 'todo') {
                data.todo.splice(data.todo.indexOf(value), 1);
        } else {
                data.completed.splice(data.completed.indexOf(value), 1);
        }
        dataObjectUpdated();
        parent.removeChild(item);
}

function completeItem() {
        var item = this.parentNode.parentNode;
        var parent = item.parentNode;
        var id = parent.id;
        var value = item.innerText;
        if (id === 'todo') {
                data.todo.splice(data.todo.indexOf(value), 1);
                data.completed.push(value);
        } else {
                data.completed.splice(data.completed.indexOf(value), 1);
                data.todo.push(value);
        }
        dataObjectUpdated();
        // Check if the item should be added to the completed list or to re-added to the todo list
        var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
        parent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);
}
// Adds a new item to the todo list
function addItemToDOM(text, completed) {
        var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');
        var item = document.createElement('li');
        item.innerText = text;
        var buttons = document.createElement('div');
        buttons.classList.add('buttons');
        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = removeSVG;
        // Add click event for removing the item
        remove.addEventListener('click', removeItem);
        var complete = document.createElement('button');
        complete.classList.add('complete');
        complete.innerHTML = completeSVG;
        // Add click event for completing the item
        complete.addEventListener('click', completeItem);
        buttons.appendChild(remove);
        buttons.appendChild(complete);
        item.appendChild(buttons);
        list.insertBefore(item, list.childNodes[0]);
}
// Radio Buttons
$('#radioBtn a').on('click', function() {
                var sel = $(this).data('title');
                var tog = $(this).data('toggle');
                $('#' + tog).prop('value', sel);
                $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
                $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
        })
        // Prevent Hash
$('.dropdown').on('click', function(event) {
        event.preventDefault();
});
// Loading Button
$('.btnremoveable').addClass('m-progress');
setTimeout(function() {
        $('.btnremoveable').removeClass('m-progress');
}, 2000);
// Contacts
//Capture the click event on a location
$("#location-bar a").on('click', function(event) {
        event.preventDefault();
        var $this = $(this),
                $li = $this.parent(),
                selectedMap = $this.attr("href"),
                selectedLocation = $this.data('location');
        $li.addClass('active').siblings('li').removeClass('active');
        //Update #map bkimage with the image from the location
        $('#map').css('background-image', 'url(' + selectedMap + ')');
        //update tooltip 'address'
        $('.selectedLocation').text(selectedLocation);
});