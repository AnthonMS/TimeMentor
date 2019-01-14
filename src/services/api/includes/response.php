<?php
class Response {
    public $success = false;
    public $result;
    public $msg = "";

    function setSuccess($succ) {
        $this->success = $succ;
    }
    function getSuccess() {
        return $this->success;
    }
    function setResult($res) {
        $this->result = $res;
    }
    function getResult() {
        return $this->result;
    }
    function setMsg($m) {
        $this->msg = $m;
    }
    function getMsg() {
        return $this->msg;
    }

    function getMe() {
        return $this;
    }

    function jsonEnc() {
        return json_encode($this);
    }
}

?>