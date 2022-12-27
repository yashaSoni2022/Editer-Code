import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { CodeEditorService } from 'src/app/services/code-editor.service';


const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';



@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.scss']
})
export class EditerComponent implements OnInit {



  @ViewChild('codeEditor') codeEditorElRef!: ElementRef<HTMLElement>;
  private codeEditor!: ace.Ace.Editor;
  private editorBeautify: any;
  output = " ";
  input = " ";
  opos = `{
    "code":"a=input();b=input();print('nikhil'+a+b+c)"
  }`;
  option = "python3";
  Inputs = " ";
  json = JSON.parse(this.opos);



  constructor(private servicedata: CodeEditorService) { }

  ngOnInit(): void {
    this.editorBeautify = ace.require('ace/ext/beautify');


  }
  ngAfterViewInit(): void {
    ace.require('ace/ext/language_tools');
    const element = this.codeEditorElRef.nativeElement;
    const editorOptions = this.getEditorOptions();

    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);
    this.codeEditor.setValue("");

  }
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity,
    };

    const extraEditorOptions = {
      enableBasicAutocompletion: true
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }
  beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }

  }
  getCode() {
    this.Inputs = this.Inputs.replace(/\n/g, "\\n");
    this.Inputs = this.Inputs.replace(/ /g, "\\n");
    if (this.codeEditor.getValue().length === 0) { 
      return }
    this.opos = "{\"code\":\"" + this.codeEditor.getValue().replace(/\n/g, " ") + "\",\"lang\":\"" + this.option + "\",\"input\":\"" + this.Inputs + "\"}";
    this.Inputs = this.Inputs.replace("\\n", " ");
    this.json = JSON.parse(this.opos);
    this.servicedata.runData(this.json).subscribe((data) => {
      this.output = data.output;
    })

  }
  LCupdate() {
    if (this.option == "python3") this.codeEditor.setValue("a=input();b=input();print('A+b:'+a+b);");
    else if (this.option == "lua") this.codeEditor.setValue("local x = 10; local y = 25; local z = x + y;  print('Sum of x+y =',z);");
    else if (this.option == "php") this.codeEditor.setValue("<?php $x=10; $y=245; $z=$x+$y; $msg = 'Sum of x+y = '; print($msg.$z); ?>");
    else if (this.option == "dart") this.codeEditor.setValue("void main(){ var x = 10; var y = 25; var z = x + y; print('x + y = $z'); }");
    else if (this.option == "java") this.codeEditor.setValue("import java.util.Scanner;  public class MyClass { public static void main(String args[]) { Scanner myObj = new Scanner(System.in);System.out.println(\\\"Enter username\\\");String userName = myObj.nextLine();  String Name = myObj.nextLine();System.out.println(\\\"Username is: \\\" + userName+Name);} }");
  }

  clearCode() {
    this.codeEditor.setValue('');
  }
}
