module.exports = function(grunt){
	
	grunt.initConfig({
		browserify: {
			js: {
		        src: 'app/js/app.js',
		        dest: 'js/app.js',
		        options: {
		          external: ['angular'],
		          debug: true,
		          browserifyOptions: { debug: true }
		        }
		    },
		},
		watch: {
			js: {
				files: ['app/js/**/*.js', 'app/js/app.js'],
				tasks: ['browserify']
			},
			css: {
				files: ['app/scss/**/*.scss'],
				tasks: ['sass']
			}
		},
		sass: {                             
			dist: {                            
				files: {                         
					'css/main.css': 'app/scss/main.scss',       
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass', 'browserify', 'watch' ]);	
}