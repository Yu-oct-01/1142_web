$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = topic.length;
    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    for(let x = 0; x < topicCount; x++){
        $("#courseTable").append(makeRow(x, topic[x]));
    }

    function makeRow(x, topicText) {
        let isOnline = topicText.includes("線上");
        let rowStyle = isOnline ? ' class="online-topic"' : '';
        return (
            `<tr${rowStyle}>` +
            `<td>${x+1}</td>` +
            `<td>${new Date(startDate.getTime() + 7 * x * millisecondsPerDay).toLocaleDateString()}</td>` +
            `<td>${topicText}</td>` +
            "</tr>"
        );
    }

    function addTopic() {
        let newTopic = $("#newTopicInput").val().trim();
        if (newTopic === "") return;

        topic.push(newTopic);
        let x = topic.length - 1;

        $("#courseTable").append(makeRow(x, newTopic));

        $("#newTopicInput").val("").focus();
    }

    $("#addTopicBtn").on("click", addTopic);

    $("#newTopicInput").on("keypress", function(e) {
        if (e.key === "Enter") addTopic();
    });
});
