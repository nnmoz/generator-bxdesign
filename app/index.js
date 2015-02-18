var generators = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);


		this.option('project-name', {
			desc: 'Name of workflow',
			type: String,
			defaults: 'Bxdesign'
		});

		this.option('skip-install', {
			desc: 'Skip immediate installation',
			type: Boolean,
			defaults: true
		});
	},

	writing: {
		gulp: function() {
			this.template('Gulpfile.js');
		},
		packageJSON: function() {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{ package: this.options['project-name'] }
			);
		},
		spec_files: function() {
			this.copy('gitignore', '.gitignore');
			this.copy('editorconfig', '.editorconfig');
		},
		dir: function() {
			this.mkdir('dest');
			this.mkdir('src');
			this.fs.copyTpl(
				this.templatePath('index.jade'),
				this.destinationPath('index.jade'),
				{ project: this.options['project-name'] }
			);
			this.copy('style.styl', 'src/style.styl');
		}
	},

	install: {
		npm: function() {
			if (this.options['skip-install']) return;
			this.npmInstall();
		}
	},

	end: {
		endLine: function() {
			this.log("\n");
			if (this.options['skip-install']) {
				this.log(chalk.red.bold('Installation is skipped!'));
				this.log(chalk.red.bgBlue.bold('To install all required dependencies run `npm install`'));
			}
			this.log("\n");
			this.log(chalk.blue.bold('End of installation'));
		}
	}

});
