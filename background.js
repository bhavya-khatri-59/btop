let course = "";
let faculty_slot = "";
let file_name = {};
let time_last = new Date();
let det_file_name = "table_name";

let set_time_last = (time) => {
  time_last = time;
};

const trigger_download = (request) => {
  course = request.message.course;
  faculty_slot = request.message.faculty_slot;
  request.message.link_data.forEach((link) => {
    file_name[link.url] = link.title;
    browser.downloads.download({
      url: link.url,
      conflictAction: "overwrite"
    });
  });
};

const get_file_name = (fname, url) => {
  let title = "";
  let file_extension = fname.replace(/([^_]*_){8}/, "").split(".");
  file_extension = "." + file_extension[file_extension.length - 1];

  if (det_file_name === "table_name") {
    let file_prefix = file_name[url] || "";
    file_prefix = file_prefix.split("\n")[0];
    if (file_prefix.length < 4) {
      let index = file_name[url] || "";
      index = index.split("-")[0] + "-";
      let file_prefix = fname.split("_");
      for (let i = 8; i < file_prefix.length; i++) {
        title += file_prefix[i];
        title += " ";
      }
      title = index + title.split(".")[0] + "-" + file_prefix[7] + file_extension;
    } else {
      title = file_prefix + file_extension;
    }
  }
  if (title.indexOf("undefined") !== -1) {
    title = fname;
  }
  return title;
};

browser.downloads.onDeterminingFilename.addListener((item, suggest) => {
  if (item.url.indexOf("vtop") !== -1) {
    const title = get_file_name(item.filename, item.url);
    if (course !== "" && faculty_slot !== "") {
      suggest({
        filename: "VIT Downloads/" + course.replace(":", "") + "/" + faculty_slot + "/" + title
      });
    } else {
      suggest({
        filename: "VIT Downloads/Other Downloads/" + title
      });
    }
  }
});
