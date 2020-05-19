var dlId_last = 0;

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function showWindowWithCopy(text) {
	var copy_window = window.open("", "", "width=300,height=400,left=100,top=200");
  
	copy_window.document.write(text);
	copy_window.stop();
}

function download_asm(table, col) {
    //console.log("download_asm: " + table + " " + col);

	var result = [];
	var num_frames = top.window.frames.length - 1;

    jQuery(".hwp_table__programming", top.window.frames[num_frames].document).eq(table).find("tr").each(function () {

        jQuery(this).find("td").eq(col).each(function () {
            if (jQuery(this).find(".textentry-solution span").length > 0) {
                console.log(jQuery(this).find(".textentry-solution span").text());
				result.push(jQuery(this).find(".textentry-solution span").text());
				
            } else {
                console.log(jQuery(this).text());
				result.push(jQuery(this).text());
            }
        });
    });
	
	//download("table-" + table + "_col-" + col + "_code.asm", result.join("\n"));
	showWindowWithCopy(result.join("<br>"));
}

function append_buttons() {

	//inject_css();

    var id_table = 0;
	var num_frames = top.window.frames.length - 1;

    jQuery(".hwp_table__programming", top.window.frames[num_frames].document).each(function () {
        if (jQuery(this).attr("data-dlID") == undefined) {
        jQuery(this).attr("data-dlID", id_table.toString());
        console.log("Found table");

        var id_col = 0;

        jQuery(this).find("tr").first().find("th").each(function () {

            /*var row = document.createElement('row');
            row.innerHTML = "<a href='#' onclick='download_asm(" + dlId_last + ");'>Download .asm</a>"

            jQuery(this).prepend(row);*/

            var a_dl = document.createElement('a');
            a_dl.setAttribute("style", "display: block;");
            a_dl.setAttribute("data-table", id_table);
            a_dl.setAttribute("data-col", id_col);
            a_dl.classList.add("btn_download");
            a_dl.innerHTML = "DL";

            a_dl.addEventListener("click", function () {
                download_asm(jQuery(this).attr("data-table"), jQuery(this).attr("data-col"));
            });

            jQuery(this).prepend(a_dl);
            //jQuery(a_dl).click(() => download_asm(id_table, id_col));

            console.log("Prepending in th: " + id_table + " " + id_col);

            id_col++;

        });

        id_table++;
        }

    });

}

function inject_css() {
	var num_frames = top.window.frames.length - 1;
    jQuery("head", top.window.frames[num_frames].document).append("<link rel='stylesheet' href='http://localhost/hwp_v5_programming_table.css'>");
}
