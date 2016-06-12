(function(React, ReactDOM, Reflux, ReactBootstrap, converterActions, converterStore, global) {

    var ConverterApp = React.createClass({
        mixins: [Reflux.connect(converterStore, 'numbers')],
        convertArabicToRoman: function(e){
            var numbers = this.state.numbers;
            numbers.arabic = e.target.value;
            this.setState({numbers: numbers});
            converterActions.convertArabicToRoman();
        },
        convertRomanToArabic: function(e){
            var numbers = this.state.numbers;
            numbers.roman = e.target.value.toUpperCase();
            this.setState({numbers: numbers});
            converterActions.convertRomanToArabic();
        },
        render: function() {
            var n = this.state.numbers;
            
            var InputGroup = ReactBootstrap.InputGroup;
            var FormControl = ReactBootstrap.FormControl;
            var Alert = ReactBootstrap.Alert;
            if (n.error) {
                return (
                    <div>
                        <InputGroup>
                            <FormControl type="text" placeholder="Arabic number" value={n.arabic} onChange={this.convertArabicToRoman}></FormControl>
                            <InputGroup.Addon>-</InputGroup.Addon>
                            <FormControl type="text" placeholder="Roman number" value={n.roman} onChange={this.convertRomanToArabic}></FormControl>
                        </InputGroup>
                        <br/>
                        <Alert bsStyle="danger">{n.error}</Alert>
                    </div>
                );
            } else {
                return (
                    <div>
                        <InputGroup>
                            <FormControl type="text" placeholder="Arabic number" value={n.arabic} onChange={this.convertArabicToRoman}></FormControl>
                            <InputGroup.Addon>-</InputGroup.Addon>
                            <FormControl type="text" placeholder="Roman number" value={n.roman} onChange={this.convertRomanToArabic}></FormControl>
                        </InputGroup>
                    </div>
                );
            }
        }
    });

    ReactDOM.render(
        <ConverterApp/>, document.getElementById('content'));

})(window.React, window.ReactDOM, window.Reflux, window.ReactBootstrap, window.converterActions, window.converterStore, window);
