/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test that loops through each feed in the allFeeds object and ensures it
        // has a URL define and that the URL is not empty.
        it('URLs are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        // Test that loops through each feed in the allFeeds object and ensures it has a name defined
        // and that the name is not empty.
        it('Defines a name for each feed that is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    // Test suite named "The menu"
    describe('The menu', function() {

        // Test that ensures the menu element is hidden by default.
        it('Menu should be hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        // Test that ensures the menu changes visibility when the menu icon is clicked.
        // This test has two expectations: does the menu display when
        // clicked and does it hide when clicked again.
        it('Menu should change visibility when clicked', function() {
            // On first click, menu appears and menu-hidden class is removed
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            // On second click, menu disappears and menu-hidden class is applied
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    // Test suite named "Initial Entries"
    describe('Initial Entries', function() {
        // Test that ensures when the loadFeed function is called and completes its work, there is at least
        // a single .entry element within the .feed container.
        // Because loadFeed() is asynchronous this test requires
        // the use of Jasmine's beforeEach and asynchronous done() function.
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('Should have a least one .entry in the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // Test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        // Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        // loadFeed is asynchronous so we're using Jasmine's beforeEach and done functions again.
         beforeEach(function(done) {
            loadFeed(1, function() {
                feedContent = $('.feed').html();
                done();
            });
        });

        it('Changes contents when a new feed is loaded', function(done) {
            loadFeed(0, function() {
                expect($('.feed').html()).not.toEqual(feedContent);
                done();
            });
        });
    });

}());
