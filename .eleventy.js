const sass = require("sass");
const path = require("node:path");

module.exports = function(eleventyConfig) {
   // add as a valid template language to process, e.g. this adds to --formats
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    // can be an async function
    compile: function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

      let result = sass.compileString(inputContent, {
        loadPaths: [
          parsed.dir || ".",
          this.config.dir.includes
        ]
      });

      return (data) => {
        return result.css;
      };
    }
  });
};


module.exports = function(eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
		files: '/static/css/*.css'
	});
};

// Copy over all imagery
module.exports = function (eleventyConfig) {
	// Output directory: _site
	eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("static/font");
  eleventyConfig.addPassthroughCopy("static/a");
  eleventyConfig.addPassthroughCopy("static/js");

};