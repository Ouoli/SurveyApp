/**
 * ExportExcelController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  exportexcel: async function (req, res) {
    const xl = require('excel4node');
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet_1');

    var evaluation = await Evaluation.findOne(req.params.id).populate("feedbacks");
    let headingColumnNames = []
    let headingColumnTitles = []

    evaluation.pages[0].questions.forEach(function (question) {
      headingColumnNames.push(question.name)
      headingColumnTitles.push(question.title)
    });

    //console.log(evaluation.feedbacks);

    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++)
        .string(heading)
    });

    headingColumnIndex = 1;
    headingColumnTitles.forEach(heading => {
      ws.cell(2, headingColumnIndex++)
        .string(heading)
    });

    //Write Data in Excel file
    //data is array, record is an object
    let rowIndex = 3;
    evaluation.feedbacks.forEach(record => {
      let columnIndex = 0;
      Object.keys(record.data).forEach(columnName => {
        columnIndex++;
        if (typeof (record.data[columnName]) == 'string')
          ws.cell(rowIndex, columnIndex).string(record.data[columnName])
        else
          ws.cell(rowIndex, columnIndex).number(record.data[columnName])
      });
      rowIndex++;
    });
    var name = await Course.findOne(req.params.id).populate("evaluation");
    var name1 = name.code + ".xlsx";
    return wb.write(name1, res);
    //return wb.write('FeedbackData.xlsx', res);
    //wb.write('FeedbackData.xlsx');
  }
};

