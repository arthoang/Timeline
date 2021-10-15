//Content object
const modalContentArr = [
    {
        'id': 'milestone-NUS-overlay',
        'logo': 'NUS.png',
        'header': 'Bachelor of Computing',
        'duration': '2003 - 2007',
        'description': [
            'After taking 2 years of university in Vietnam, Andrew decided to pursue a career in IT. Therefore he applied for Computer Science course in Singapore. After 4 years, he obtained the Bachelor of Computing degree here.'
        ]
    },
    {
        'id': 'milestone-NCS-overlay',
        'logo': 'NCS.png',
        'header': 'Application Consultant',
        'duration': '2007 - 2010',
        'description': [
            'Supported and maintained business as usual activities for Singapore Ministry of Education Applications.',
            'Obtained Award for People Excellent Service in 2008 in Integrated Examination System maintenance project.',
            'Joined development team of Student Hub System, which manages students’ information within Singapore. The system has interfaces to all the schools and institutions in Singapore.'
        ]
    },
    {
        'id': 'milestone-GESG-overlay',
        'logo': 'GE.png',
        'header': 'Software Engineer',
        'duration': '2010 - 2011',
        'description': [
            'Assisted in the integration testing, user acceptance testing and implementation activities to fix the reported problems/bugs of the system.',
            'Developed proposals and strategies for software design activities.',
            'Analyzed process/program specifications and translate specifications to program codes.',
            'Investigated all reported problems/errors and initiated amendments and testing so that the system can operate correctly and efficiently.'
        ]
    },
    {
        'id': 'milestone-GEVN-overlay',
        'logo': 'GE.png',
        'header': 'Business Analyst',
        'duration': '2011 - 2014',
        'description': [
            'Acted as a key role to coordinate between local users (both IT and business users) and Group IT, to deliver releases of core insurance enhancements to support the business, from requirement elicitation, analysis, and documentation to acceptance testing and go-live. ',
            'Supported new product launch: process and product analysis, gap analysis and system deliveries. Successfully launched Universal Life, Education, Healthcare products.',
            'Implemented local sub systems to improve local business which raised customer satisfaction by 30% and agency engagement by 35%.'
        ]
    },
    {
        'id': 'milestone-VPB-overlay',
        'logo': 'VPB.png',
        'header': 'Senior Business Analyst',
        'duration': '2015 - 2016',
        'description': [
            'Spearheaded initiative to support House Hold Business Department to be an independent sector from the bank, by evaluating business applications and infrastructure needed, proposing solutions for front end, back end core systems and various sub systems.',
            'Implemented mobile, front end and back end systems to support new product launched and played a key role as liaison between internal users, internal IT department and IT department at headquarter. ',
            'Delivered the integration between House Hold department applications with the core banking applications, following the bank standards and policies.'
        ]
    },
    {
        'id': 'milestone-CWB-overlay',
        'logo': 'CWB.png',
        'header': 'Senior Business Analyst',
        'duration': '2017 - 2018',
        'description': [
            'Implemented digital banking products for Commonwealth Bank of Australia – South Africa branch.',
            'Launched releases of kiosk, smartapp in South Africa to engage customer self-services and attract new 200,000 customers in South Africa and lead the market in digital banking.',
        ]
    },
    {
        'id': 'milestone-FFUN-overlay',
        'logo': 'FFUN.png',
        'header': 'IT Coordinator',
        'duration': '2020 - Current',
        'description': [
            'Install, configure and deploy workstations to clients in FFUN Group Dealerships. Troubleshoot hardware, software, and networking issues for end users',
            'Support onboarding and offboarding process for staffs.',
            'Document processes and IT infrastructure information.',
            'Maintain company websites. Built scripts to integrate and automate vendors MSP service with internal IT processes.'
        ]
    },
    {
        'id': 'milestone-CDI-overlay',
        'logo': 'CDI.png',
        'header': 'Diploma in Web and Mobile Application Development',
        'duration': '2021 - 2022',
        'description': [
            'After playing various roles in IT, Andrew is still passionate about building apps. Even though he has not been practically working on programming for a period of time, he decided to pursue studying again. He was admitted to Web and Mobile Application development at CDI College in Canada. He is expected to graduated in Fall 2022, and continue to pursue his career in Application Development.'
        ]
    },
];

var currentModalSelected = 0;
var modalMode = false;
var currentModal;

//on document ready
$(function() {
        generateHeaderTriangle('div.triangle-overlay', fillColor='#f2e8d2', animated=true, fillClass='fill-yellow');

        var milestonesArr = $('section.section-timeline').find('div.timeline-milestone');
        

        //register for timeline event listener
        milestonesArr.each(
            function(key, value) {
                //register event listener for each element in the array
                $(this).click(
                    function(event) {
                        currentModalSelected = key;
                        showModal();
                    }
                );
                $(this).hover(function() {
                    $(this).find('div.timeline-animation-wrap').toggleClass('timeline-animation-wrap--rotate');
                })
            }
        ); 

        //animation for timeline hover
        var msAnimationDivs = $('div.timeline-animation-wrap');
        msAnimationDivs.each(
            function(key, value) {
                //calculate height
                var parentHeight = $(value).parent().outerHeight();
                var thisHeight = parentHeight * 0.50;
                
                //position the element
                $(this).css({
                    'height': thisHeight,
                    'margin-bottom': -thisHeight
                });
                
            }
        )

        //register for CTA button
        $('button.btn--cta').click(
            function(event) {
                event.preventDefault();
                $("html, body").animate( {scrollTop: $('html').prop('scrollHeight')}, 3000);
            }
        );
    }
);

$(window).on('resize.timeline', function() {
    //redraw triangle header
    generateHeaderTriangle('div.triangle-overlay', fillColor='#f2e8d2', animated=true, fillClass='fill-yellow');
    if (modalMode) {
        //close currentModal
        currentModal.dialog('close');        
    }

});

function showModal() {
    currentModal= $('aside.timeline-dialog-overlay');

    updateModalContent();
    
    currentModal.dialog({
        modal: true,
        'width': $(window).width(),
        'height': $(window).innerHeight(),
        resizable: false,
        draggable: false,
        open: openDialog,
        close: closeDialog,
        show: {
            effect: 'clip',
            duration: 300,
        }
    });
}

function openDialog() {
    $('body').addClass('stop-scrolling');
    modalMode=true;
    generateHeaderTriangle('div.milestone-overlay-triangle', fillColor='#fff', animated=false);
}

function closeDialog() {
    modalMode=false;
    currentModal = undefined;
    $('body').removeClass('stop-scrolling');
}

function updateModalContent() {
    var modal= $('aside.timeline-dialog-overlay');
    var currentModalContent = modalContentArr[currentModalSelected];
    modal.attr('id', currentModalContent.id);
    
    //update logo
    var imgSrc = 'images/Logo/' + currentModalContent.logo;
    $('img.tl-dg-img').attr('src', imgSrc);

    //update header
    $('h1.tl-dg-story-header').text(currentModalContent.header);

    //update period
    $('h2.tl-dg-story-time').text(currentModalContent.duration);

    /* update description */
    //clear previous li list
    var descList = $(currentModalContent.description);
    var ulEl = $('ul.tl-dg-story-description');
    ulEl.empty();
    descList.each(
        function(_, value) {
            ulEl.append($('<li>').text(value));
        }
    );

    /* update nav links */
    //update prev link
    
    if (currentModalSelected === 0) {
        
        //hide prev link
        $('ul.overlay-navbar-links').off('click.timeline-overlay-nav','li#overlay-nav-prev')
                                    .find('li#overlay-nav-prev').html(' ');
                                    
    } else {
        var navLinks = $('ul.overlay-navbar-links');
        //remove previous event, register new event, and update the text
        navLinks.off('click.timeline-overlay-nav','li#overlay-nav-prev')
                .on('click.timeline-overlay-nav','li#overlay-nav-prev', function(event) {
                    currentModalSelected -= 1;
                    updateModalContent();
                })
                .find('li#overlay-nav-prev').html('&#8592; previous');
    }
    //update next link
    if (currentModalSelected === modalContentArr.length-1) {
        
        //hide prev link
        $('ul.overlay-navbar-links').off('click.timeline-overlay-nav','li#overlay-nav-next')
                                    .find('li#overlay-nav-next').html(' ');
                                    
    } else {
        var navLinks = $('ul.overlay-navbar-links');
        //remove previous event, register new event, and update the text
        navLinks.off('click.timeline-overlay-nav','li#overlay-nav-next')
                .on('click.timeline-overlay-nav','li#overlay-nav-next', function(event) {
                    currentModalSelected += 1;
                    showModal();
                })
                .find('li#overlay-nav-next').html('next &#8594;');
    }
}

function generateHeaderTriangle(divClass, fillColor='transparent', animated=false, fillClass='none') {
    //draw header triangle overlay
    var svg = $(divClass).find('svg');
    var maxX = svg.outerWidth();
    var maxY = svg.outerHeight();

    //create viewBox
    var viewBox = "0 0 " + maxX + " " + maxY;
    svg.attr('viewbox', viewBox);

    //remove previous path
    svg.empty();

    //drawPath

    var drawPath = 'M0 ' + maxY + ' L' + maxX + ' ' + maxY + ' V0 Z';
    var path = $(SVG('path'));
    
    path.attr({
        'd': drawPath,
        'fill': (animated) ? 'transparent' : fillColor,
    });
            
    path.appendTo(svg);

    if (animated) {
        jQuery.Color.hook("fill");
        path.toggleClass(fillClass, 1000);
    }
}

function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

