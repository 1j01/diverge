(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5:function(e,t,n){e.exports=n(9)},9:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(1),i=["Hello world!","That quick brown fox was jumping all around","The quick brown fox was jumping all around","The quick brown fox jumps over lazydawgs","The quick brown fox jumps over a lazy dog","Sphinx of black quartz, judge my vow.","The previous pigeon tempers the crystal answer.","Over the definite minimalist overlaps this grateful drama.","A shortened analogue baffles the percentage on top of the acoustic client.","An abbreviated analog confuses the rate on top of the acoustic customer.","Will the client deduce the modern paint?","An egg attacks!","Does the outstanding immortal reach past the absolute?","Our still-competitor lands the aircraft next to his opening taste.","A sushi-centric motif, but with so many pairs of chopsticks, and only one piece of sushi","What is this trying to say? There are ways of thinking that don't exist yet","What is this trying to say? There are ways of thinking that haven't been invented","What is this trying to say? There are ways of thinking that haven't been discovered","What is this trying to say? There are ways of thinking that haven't been thought of","What is this trying to say? There are ways of thinking that haven't been thought of yet","What are you trying to say?","Who are *you*?","This isn't trying to solve a problem.","I want to explore.","I implore you to explore the text galore","where there's text, there's always more","there's always more, there's always more","there's always more... there's always more...","The medium is the message.","The Medium is the Message","The Medium is the Massage","The Medium is the Mess Age","The Medium is the Mass Age","Diverge at every letter","Diverge at every word and any letter","Diverge at any word or letter","alphabeta-magneta","alphabetic-magnetic","alphabetically magnetic","start from nothing","start from nothing, end up with something","start from nothing, end up somewhere you didn't expect","start from something, end up somewhere you didn't expect","Textploration incarnate.","A new medium of text.","A new medium for text.","A medium for massaging text.","A new medium for textploration.","It's a bit of a surprise to see you again for the first time.","Once upon a time,","Once upon a time, there was a","Once upon a time, there was a time that wasn't once; it was twice and it was thrice, all because of a device.","Once upon a time, there was a time that wasn't once; it was twice and it was thrice, all because of this device. It was","The utter minimalism of a centered blinking cursor is appealing.","while the world was not perfect, we could and would make it better.","i can work with that.","QWERTYUIOPASDFGHJKLZXCVBNM 1234567890 `~-_=+[{]}\\|;:'\",<.>/?","qwertopia","ABCDEFGHIJKLMNOPQRSTUVWXYZ","asdlkjlakjdflskjdf","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla sed arcu id consequat. Nulla nec urna sed lectus semper cursus. Nunc quis rhoncus elit, sed tincidunt odio. Sed ornare fringilla sem, non fringilla nibh sagittis eget. Integer commodo nulla elit, in efficitur augue venenatis eget. Proin id metus vel neque convallis sagittis eget eu turpis. Nulla lacinia nec sem et posuere. Aliquam ex magna, lacinia sed erat a, accumsan ullamcorper nunc. Integer non est sodales, mollis lorem egestas, molestie mauris. Fusce pharetra leo sit amet urna porttitor, at eleifend tortor maximus.","]0301/134429.526:ERROR:exception_handler_server.cc(524)] ConnectNamedPipe: The pipe is being closed. (0xE8)"],o=function(){function e(){Object(r.a)(this,e)}return Object(a.a)(e,[{key:"query",value:function(){return i}}]),e}(),s=n(4),c=function(e){var t=0,n=!0,r=!1,a=void 0;try{for(var i,o=e.values()[Symbol.iterator]();!(n=(i=o.next()).done);n=!0){t+=i.value}}catch(s){r=!0,a=s}finally{try{n||null==o.return||o.return()}finally{if(r)throw a}}return t},l=function(e,t){var n=Math.random()*t,r=0,a=!0,i=!1,o=void 0;try{for(var c,l=e.entries()[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var h=c.value,d=Object(s.a)(h,2),u=d[0];if(n<(r+=d[1]))return u}}catch(m){i=!0,o=m}finally{try{a||null==l.return||l.return()}finally{if(i)throw o}}},h=function(){function e(t){Object(r.a)(this,e),this.order=t,this.ngrams=new Map}return Object(a.a)(e,[{key:"train",value:function(e){if(e.length>0)for(e+=e.slice(0,this.order);e.length<this.order;)e+=e.slice(0,this.order);for(var t=e.length,n=0;n<t-this.order;n++){var r=e.slice(n,n+this.order);this.ngrams.set(r,(this.ngrams.get(r)||0)+1)}this.ngram_keys=Array.from(this.ngrams.keys()),this.sum_total_weight=c(this.ngrams)}},{key:"continueText",value:function(e,t){var n=this,r=e.length+t;e.length<this.order&&(e+=l(this.ngrams,this.sum_total_weight));for(var a=function(t){var r=e.slice(e.length-n.order+1),a=new Map;n.ngram_keys.filter(function(e){return r===e.slice(0,n.order-1)}).forEach(function(e){a.set(e.slice(n.order-1),n.ngrams.get(e))}),e+=l(a,c(a))||l(n.ngrams,n.sum_total_weight)},i=0;i<t&&e.length<r;i++)a();return e}}]),e}(),d=function(){function e(t){var n=t.order,a=t.corpusText;Object(r.a)(this,e),this.markov=new h(n),this.markov.train(a)}return Object(a.a)(e,[{key:"query",value:function(e,t){var n=this;return new Array(5).fill(0).map(function(){return n.markov.continueText(e,20)})}}]),e}(),u=function(){function e(t){var n=t.order;Object(r.a)(this,e),this.order=n}return Object(a.a)(e,[{key:"query",value:function(e,t){var n=new h(this.order);return n.train(e),new Array(3).fill(0).map(function(){return n.continueText(e,20)})}}]),e}(),m=function(){function e(){Object(r.a)(this,e),this.suffix="(no pun intended)"}return Object(a.a)(e,[{key:"query",value:function(e,t){return[e+" "+this.suffix]}}]),e}(),p=n(2),g=n(3);function f(e){var t=e.toLowerCase().split(/[\s,.\/;:"\\[\]!.\-_+|?]+/).filter(function(e){return e}),n=[];return t.forEach(function(e){n=n.concat(function(e){e=e.toLowerCase();var t=g[e];return t?t.split(" "):function(e){e=e.toLowerCase();for(var t=[],n=!1,r=0;r<e.length;r++){var a=!1;!(a=!!e[r].match(/[aeiou]/)||"y"===e[r]&&(!!n||!e[r+1]||!e[r+1].match(/[aeiou]/)))||n&&0!==r||t.push("@"),a||!n&&0!==r||t.push("$"),n=a}return t}(e)}(e))}),n}var w=function(){function e(t){var n=t.maxDistance,a=t.minDistanceBeforeCloserIsBetter,i=t.closerIsBetterFactor;Object(r.a)(this,e),this.windowSize=n,this.minDistanceBeforeCloserIsBetter=a,this.closerIsBetterFactor=i}return Object(a.a)(e,[{key:"evaluate",value:function(t){var n=this,r=f(t),a=[],i=[],o=0,s=0;return r.forEach(function(t){if(Object(p.isVowelish)(Object(p.stripStressor)(t))||"@"===t){a.length>n.windowSize&&(a.shift(),i.shift());var r=a.findIndex(function(n){return e.testVowelAssonance(n,t)}),c=r>-1&&"@"!==t;s+=1,c&&(o+=1,i[r]||(o+=1,i[r]=!0)),a.push(t),i.push(c)}}),o/Math.max(s,1)}}],[{key:"testVowelAssonance",value:function(e,t){var n=function(e){return"AH"===(e=(e=(e=Object(p.stripStressor)(e)).replace(/R/,"H")).replace(/W/,""))&&(e="EH"),e};return!e.match(/[@$?]/)&&!t.match(/[@$?]/)&&n(e)===n(t)}}]),e}(),y=document.getElementById("input"),b=document.getElementById("canvas"),v=b.getContext("2d"),k=[],x=0,_=function(e){(x+=e)<0&&(x=k.filter(function(e){return e._visible}).length-1),x>k.filter(function(e){return e._visible}).length-1&&(x=0)},T=function(){return k.filter(function(e){return e._visible})[x]},A=[new o,new d({order:5,corpusText:'If I needed someone to love\r\nYou\'re the one that I\'d be thinking of\r\nIf I needed someone\r\n\r\nIf I had some more time to spend\r\nThen I guess I\'d be with you my friend\r\nIf I needed someone\r\nHad you come some other day\r\nThen it might not have been like this\r\nBut you see now I\'m too much in love\r\n\r\nCarve your number on my wall\r\nAnd maybe you will get a call from me\r\nIf I needed someone\r\nAh, ah, ah, ah\r\n\r\nIf I had some more time to spend\r\nThen I guess I\'d be with you my friend\r\nIf I needed someone\r\nHad you come some other day\r\nThen it might not have been like this\r\nBut you see now I\'m too much in love\r\n\r\nCarve your number on my wall\r\nAnd maybe you will get a call from me\r\nIf I needed someone\r\n\r\nKBpedia is now open source!\r\nKBpedia Knowledge Structure\r\n\r\n\r\nHOME\r\nKNOWLEDGE GRAPH\r\nDEMO\r\nBACKGROUND\r\nUSE CASES\r\nRESOURCES\r\n\r\n  Use Cases Word Embedding Corpuses\r\n\r\nUSE CASE\r\nTitle:\tDocument-specific word2Vec Training Corpuses\r\nShort Description:\tThe rich structure in KBpedia is used to create training corpuses for word2vec rapidly and cheaply on the fly\r\nProblem:\tWe need to cluster or classify documents by topic, or to characterize them by sentiment or for recommendations\r\nApproach:\tword2vec is an artificial intelligence \'word embedding\' model that can establish similarities between terms. These similarities can be used to address the stated problems. The rich structure and entity types within KBpedia\'s knowledge structure can be used, with one or two simple queries, to create relevant domain "slices" of tens of thousands of documents and entities upon which to train word2vec models. This approach eliminates the majority of effort normally associated with word2vec for domain purposes, enabling available effort to be spent on refining the parameters of the model for superior results\r\nKey Findings:\r\nDomain-specifc training corpuses work better with less ambiguity than general corpuses for these problems\r\nKBpedia speeds and eases the creation of domain-specific training corpuses for word2vec (and other corpus-based models)\r\nOther public and private text sources may be readily added to the KBpedia baseline in order to obtain still further domain-relevant models\r\nSuch domain-specific training corpuses can be used to establish similarity between local text documents or HTML web pages\r\nThis method can also be combined with a topics analyzer to first tag text documents using KBpedia reference concepts, and then inform or augment these domain-specific training corpuses\r\nThese capabilities enable rapid testing and refinement of different combinations of "seed" concepts to obtain better desired results.\r\n\r\n\r\n\r\n\r\nAccording to DeepLearning4J\'s Word2Vec tutorial, "Given enough data, usage and contexts, Word2vec can make highly accurate guesses about a word\u2019s meaning based on past appearances. Those guesses can be used to establish a word\u2019s association with other words (e.g., \'man\' is to \'boy\' what \'woman\' is to \'girl\'), or cluster documents and classify them by topic. Those clusters can form the basis of search, sentiment analysis and recommendations in such diverse fields as scientific research, legal discovery, e-commerce and customer relationship management."\r\n\r\nWord2vec is a two layer artificial neural network used to process text to learn relationships between words within a text corpus. Word2vec takes as its input a large corpus of text and produces a high-dimensional space (typically of several hundred dimensions), with each unique word in the corpus being assigned a corresponding vector in the space. This "word embedding" approach is able to capture multiple different degrees of similarity between words. To create the model of relationships between the words, a particular grouping of text or documents is fed to the word2vec process, which is called the training corpus.\r\n\r\nThis use case shows how the KBpedia knowledge structure can be used to automatically create highly accurate domain-specific training corpuses that can be used by word2vec to generate word relationship models, often with superior performance and results to generalized word2vec models. The basic approach in this use case is not only applicable to word2vec, but to any method that uses corpuses of text for training. For example, in another use case, we will show how this can be done with another algorithm called ESA (Explicit Semantic Analysis).\r\n\r\nIt is said about word2vec that "given enough data, usage and contexts, word2vec can make highly accurate guesses about a word\u2019s meaning based on past appearances." What this use case shows is how the context of the training corpus may greatly impact the results. This use case also shows how KBpedia may be leveraged to quickly create very responsive domain-specific corpuses for training the model.\r\n\r\n\r\nTraining Corpus\r\nA training corpus is really just a set of text used to train unsupervised machine learning algorithms. Any kind of text can be used by word2vec. The only thing it does is to learn the relationships between the words that exist in the text. However, not all training corpuses are equal. Training corpuses are often dirty, biaised and ambiguous. Depending on the task at hand, it may be exactly what is required, but more often than not, such errors need to be fixed. Cognonto has the advantage of starting with clean text.\r\n\r\nWhen we want to create a new training corpus, the first step is to find a source of text that could work to create that corpus. The second step is to select the text we want to add to it. The third step is to pre-process that corpus of text to perform different operations on the text, such as: removing HTML elements; removing punctuation; normalizing text; detecting named entities; etc. The final step is to train word2vec to generate the model.\r\n\r\nWord2vec is somewhat dumb. It only learns what exists in the training corpus. It does not do anything other than "read" the text and then analyze the relationships between the words (which are really just groups of characters separated by spaces). The word2vec process is highly subject to the Garbage In, Garbage Out principle, which means that if the training set is dirty, biaised and ambiguous, then the learned relationship will end-up being of little or no value.\r\n\r\n\r\nDomain-specific Training Corpus\r\nA domain-specific training corpus is a specialized training corpus where its text is related to a specific domain. Examples of domains are music, mathematics, cars, healthcare, etc. In contrast, a general training corpus is a corpus of text that may contain text that discusses totally different domains. By creating a corpus of text that covers a specific domain of interest, we limit the usage of words (that is, their co-occurrences) to texts that are meaningful to that domain.\r\n\r\nAs we will see in this use case, a domain-specific training corpus can be quite useful, and much more powerful, than general ones, if the task at hand is in relation to a specific domain of expertise. In the past, the major problem with domain-specific training corpuses was that they were costly to create. These costs arose because it is necessary to find a source of data to use, and then to select the specific documents to include in the training corpus. This can work if we want a corpus with 100 or 200 documents, but what if you want a training corpus of 100,000 or 200,000 documents? Then it becomes a problem.\r\n\r\nThis is the kind of problem that KBpedia helps to resolve. KBpedia is a set of ~39,000 reference concepts that have ~138,000 links to schema of external data sources such as Wikipedia, Wikidata and USPTO. It is that structure and these links to external data sources that we use to create domain-specific training corpuses on the fly. We leverage the reference concept structure to select all of the concepts that should be part of the domain that is being defined. Then we use inference capabilities to infer all of the thousands of concepts that define the full scope of the domain. Then we analyze the hundreds or thousands of concepts we selected that way to get all of the links to external data sources. Finally we use these references to create the training corpus. All of this is done automatically once the initial few concepts that define the subject domain get selected. The workflow looks like:\r\n\r\ncognonto-workflow.png\r\n\r\nThe Process\r\nTo show how this process works, let\'s create a domain-specific training corpus using KBpedia about, say, musicians. We will compare this domain-specific corpus to the general word2vec model created by Google based on news sources that has about 100 billion words. The Google model contains 300-dimensional vectors for 3 million words and phrases. We will use the Google News model as the general model to compare the results/performance to our domain-specific musicians model.\r\n\r\n\r\nDetermining the Domain\r\nThe first step is to define the scope of the domain we want to create. For this use case example, we want a domain that is somewhat constrained to create a training corpus that is not too large for demo purposes. The domain we have chosen is musicians. This domain is related to people and bands that play music. It is also related to musical genres, instruments, music industry, etc.\r\n\r\nTo create this domain, we beginwith a single KBpedia reference concept: Musician. If we want to broaden the scope of the domain, we could have included other concepts such as: Music, Musical Group, Musical Instrument, etc.\r\n\r\n\r\nAggregating the Domain-specific Training Corpus\r\nOnce we have determined the scope of the domain, the next step is to query the KBpedia knowledge base to aggregate all of the text that will belong to that training corpus. The end result of this operation is to create a training corpus with text that is only related to the scope of the domain we defined.\r\n\r\n(defn create-domain-specific-training-set\r\n  [target-kbpedia-class corpus-file]\r\n  (let [step 1000\r\n        entities-dataset "http://kbpedia.org/knowledge-base/"\r\n        kbpedia-dataset "http://kbpedia.org/kko/"\r\n        nb-entities (get-nb-entities-for-class-ws target-kbpedia-class entities-dataset kbpedia-dataset)]\r\n    (loop [nb 0\r\n           nb-processed 1]\r\n      (when (< nb nb-entities)\r\n        (doseq [entity (get-entities-slice target-kbpedia-class entities-dataset kbpedia-dataset :limit step :offset @nb-processed)]\r\n          (spit corpus-file (str (get-entity-content entity) "\\n") :append true)\r\n          (println (str nb-processed "/" nb-entities)))\r\n        (recur (+ nb step)\r\n               (inc nb-processed))))))\r\n\r\n(create-domain-specific-training-set "http://kbpedia.org/kko/rc/Musician" "resources/musicians-corpus.txt")\r\nWhat this code does is to query the KBpedia knowledge base to get all the named entities that are linked to it, for the scope of the domain we defined. Then the text related to each entity is appended to a text file where each line is the text of a single entity.\r\n\r\nGiven the scope of the current use case, the musicians training corpus is composed of 47,263 documents. With a simple function, we are able to aggregate 47,263 text documents highly related to a conceptual domain we defined on the fly. All of the hard work has been delegated to the knowledge base and its conceptual structure. (In fact, this simple function leverages 8 years of hard work).\r\n\r\n\r\nNormalizing Text\r\nThe next step is a common one related to any NLP pipeline. Before learning from the training corpus, we should clean and normalize the text of its raw form.\r\n\r\n(defn normalize-proper-name\r\n  [name]\r\n  (-> name\r\n      (string/replace #" " "_")\r\n      (string/lower-case)))\r\n\r\n(defn pre-process-line\r\n  [line]\r\n  (-> (let [line (-> line\r\n                     ;; 1. remove all underscores\r\n                     (string/replace "_" " "))]\r\n        ;; 2. detect named entities and change them with their underscore form, like: Fred Giasson -> fred_giasson\r\n        (loop [entities (into [] (re-seq #"[\\p{Lu}]([\\p{Ll}]+|\\.)(?:\\s+[\\p{Lu}]([\\p{Ll}]+|\\.))*(?:\\s+[\\p{Ll}][\\p{Ll}\\-]{1,3}){0,1}\\s+[\\p{Lu}]([\\p{Ll}]+|\\.)" line))\r\n               line line]\r\n          (if (empty? entities)\r\n            line\r\n            (let [entity (first (first entities))]\r\n              (recur (rest entities)\r\n                     (string/replace line entity (normalize-proper-name entity)))))))\r\n      (string/replace (re-pattern stop-list) " ")\r\n      ;; 4. remove everything between brackets like: [1] [edit] [show]\r\n      (string/replace #"\\[.*\\]" " ")\r\n      ;; 5. punctuation characters except the dot and the single quote, replace by nothing: (),[]-={}/\\~!?%$@&*+:;<>\r\n      (string/replace #"[\\^\\(\\)\\,\\[\\]\\=\\{\\}\\/\\\\\\~\\!\\?\\%\\$\\@\\&\\*\\+:\\;\\<\\>\\"\\p{Pd}]" " ")\r\n      ;; 6. remove all numbers\r\n      (string/replace #"[0-9]" " ")\r\n      ;; 7. remove all words with 2 characters or less\r\n      (string/replace #"\\b[\\p{L}]{0,2}\\b" " ")\r\n      ;; 10. normalize spaces\r\n      (string/replace #"\\s{2,}" " ")\r\n      ;; 11. normalize dots with spaces\r\n      (string/replace #"\\s\\." ".")\r\n      ;; 12. normalize dots\r\n      (string/replace #"\\.{1,}" ".")\r\n      ;; 13. normalize underscores\r\n      (string/replace #"\\_{1,}" "_")\r\n      ;; 14. remove standalone single quotes\r\n      (string/replace " \' " " ")\r\n      ;; 15. re-normalize spaces\r\n      (string/replace #"\\s{2,}" " ")\r\n      ;; 16. put everything lowercase\r\n      (string/lower-case)\r\n\r\n      (str "\\n")))\r\n\r\n(defn pre-process-corpus\r\n  [in-file out-file]\r\n  (spit out-file "" :append true)\r\n  (with-open [file (clojure.java.io/reader in-file)]\r\n    (doseq [line (line-seq file)]\r\n      (spit out-file (pre-process-line line) :append true))))\r\n\r\n(pre-process-corpus "resources/musicians-corpus.txt" "resources/musicians-corpus.clean.txt")\r\nWe remove all of the characters that may cause issues to the tokenizer used by the word2vec implementation. We also remove unnecessary words and other words that appear too often or that add nothing to the model we want to generate (like the listing of days and months). We also drop all numbers. By the way, such cleaning steps are common to most such models, and can be used repeatedly across projects.\r\n\r\n\r\nTraining word2vec\r\nThe last step is to train word2vec on our clean domain-specific training corpus to generate the model we will use. For this use case, we will use the DL4J (Deep Learning for Java) library that is a Java implementation of the word2vec methods. Training word2vec is as simple as using the DL4J API like this:\r\n\r\n(defn train\r\n  [training-set-file model-file]\r\n  (let [sentence-iterator (new LineSentenceIterator (clojure.java.io/file training-set-file))\r\n        tokenizer (new DefaultTokenizerFactory)\r\n        vec (.. (new word2vec$Builder)\r\n                (minWordFrequency 1)\r\n                (windowSize 5)\r\n                (layerSize 100)\r\n                (iterate sentence-iterator)\r\n                (tokenizerFactory tokenizer)\r\n                build)]\r\n    (.fit vec)\r\n    (SerializationUtils/saveObject vec (io/file model-file))\r\n    vec))\r\n\r\n(def musicians-model (train "resources/musicians-corpus.clean.txt" "resources/musicians-corpus.model"))\r\nWhat is important to notice here is the number of parameters that can be defined to train word2vec on a corpus. In fact, word2vec can be sensitive to parametrization. In a standard use case, since creation of the domain-specific training corpus is so easy, most of the total time getting great results is spent tuning these parameters (subjects of other use cases).\r\n\r\n\r\nImporting the General Model\r\nTo provide our general comparison, we next need to import the Google News model. DL4J can import this model without having to generate it ourselves (in fact, only the model is distributed by Google, not the training corpus):\r\n\r\n(defn import-google-news-model\r\n  []\r\n  (org.deeplearning4j.models.embeddings.loader.WordVectorSerializer/loadGoogleModel (clojure.java.io/file "GoogleNews-vectors-negative300.bin.gz") true))\r\n\r\n(def google-news-model (import-google-news-model))\r\n\r\nPlaying With Models\r\nNow that we have a domain-specific model related to musicians and a general model related to news processed by Google, let\'s start playing with both to see how they perform on different tasks. In the following examples, we will always compare the domain-specific training corpus with the general one.\r\n\r\n\r\nAmbiguous Words\r\nA characteristic of words is that their surface form can be ambiguous; they can have multiple meanings. An ambiguous word can co-occur with multiple other words that may not have any shared meaning. But all of this depends on the context. If we are in a general context, then this situation will happen more often than we think and will impact the similarity score of these ambiguous terms. However, as we will see, this phenomenum is greatly diminished when we use domain-specific models.\r\n\r\n\r\nSimilarity Between Piano, Organ and Violin\r\nWhat we want to check is the relationship between 3 different music instruments: piano, organ and violin. We want to check the relationship between each of them.\r\n\r\n(.similarity musicians-model "piano" "violin")\r\n0.8810334205627441\r\n(.similarity musicians-model "piano" "organ")\r\n0.8591226935386658\r\nAs we can see, both tuples have a high likelihood of co-occurrence. This suggests that these terms of each tuple are probably highly related. In this case, it is probably because violins are often played along with a piano. And, it is probable that an organ looks like a piano (at least it has a keyboard).\r\n\r\nNow let\'s take a look at what the general model has to say about that:\r\n\r\n(.similarity google-news-model "piano" "violin")\r\n0.8228187561035156\r\n(.similarity google-news-model "piano" "organ")\r\n0.4616874158382416\r\nThe surprising fact here is the apparent dissimilarity between piano and organ compared with the results we got with the musicians domain-specific model. If we think a bit about this use case, we will probably conclude that these results makes sense. In fact, organ is an ambiguous word in a general context. An organ can be a musical instrument, but it can also be a part of an anatomy. This means that the word organ will co-occur with piano, but also to all other kinds of words related to human and animal biology. This is why they are less similar in the general model than in the domain one, because it is an ambiguous word in a general context.\r\n\r\n\r\nSimilarity Between Album and Track\r\nNow let\'s see another similarity example between two other words album and track where track is an ambiguous word depending on the context.\r\n\r\n(.similarity musicians-model "album" "track")\r\n0.838570237159729\r\n(.similarity google-news-model "album" "track")\r\n0.18461625277996063\r\nAs expected, because track is ambiguous, there is a big difference in terms of co-occurence probabilities depending on the context (domain-specific or general).\r\n\r\n\r\nSimilarity Between Pianist and Violinist\r\nHowever, are domain-specific and general differences always the case? Let\'s take a look at two words that are domain specific and unambiguous: pianist and violinist.\r\n\r\n(.similarity musicians-model "pianist" "violinist")\r\n0.8497374653816223\r\n(.similarity google-news-model "pianist" "violinist")\r\n0.8616064190864563\r\nIn this case, the similarity score between the two terms is almost the same. In both contexts (generals and domain specific), their co-occurrence is similar.\r\n\r\n\r\nNearest Words\r\nNow let\'s look at the similarity between two distinct words in two new and distinct contexts. Let\'s take a look at a few words and see what other words occur most often with them.\r\n\r\n\r\nMusic\r\n(.wordsNearest musicians-model ["music"] [] 20)\r\nmusic\r\nmusical\r\nvocal\r\norchestral\r\nvoice\r\ndance.\r\nartistic\r\nwidely\r\nromantic\r\nmodern\r\ncabaret\r\ntheatrical\r\nbelongs\r\nopera\r\ngenres.\r\nfilm\r\nmiddle_eastern\r\nsongs.\r\nspecialised\r\ngenre\r\n\r\n\r\n(.wordsNearest google-news-model ["music"] [] 20)\r\nmusic\r\nclassical_music\r\njazz\r\nMusic\r\nWithout_Donny_Kirshner\r\nsongs\r\nmusicians\r\ntunes\r\nmusical\r\nLogue_typed\r\nmusics\r\nunplugged_acoustic\r\nfunky_soulful\r\nincludes_didgeridoo_riff\r\nsoulful_melodies\r\nhip_hop\r\n_nova_samba\r\nbossa\r\nreggae\r\njazz_ragtime\r\n\r\n\r\nOne observation we can make is that the terms from the musicians model are more general than the ones from the general model.\r\n\r\n\r\nTrack\r\n(.wordsNearest musicians-model ["track"] [] 20)\r\ntrack\r\nalbum\r\nreleased.\r\ntitled\r\ndebut\r\nspawned\r\nentitled\r\ntrack.\r\nlatest\r\nhit.\r\nrelease\r\nweek\r\nyear.\r\ndania\r\nsong\r\nsummer_of_space_on_quiet\r\npositive\r\nairplay\r\ncity_productions.\r\ntracks\r\n\r\n\r\n(.wordsNearest google-news-model ["track"] [] 20)\r\ntrack\r\ntracks\r\nTrack\r\nracetrack\r\nwww.southbostonspeedway.com\r\ncuppy\r\n#/#ths-mile\r\nhorseshoe_shaped_section\r\nwagering_parlors\r\nlevigated\r\nInfineon_raceway\r\nTezgam_Express_heading\r\n#/##-mile_oval\r\nracing\r\npresident_Brandon_Igdalsky\r\npaperclip_shaped\r\ncinder_track\r\npresident_Gillian_Zucker\r\n2_#/#-mile_triangular\r\nTapeta_surface\r\n\r\n\r\nAs we know, track is ambiguous. The difference between these two sets of nearest related words is striking. There is a clear conceptual correlation in the musicians\' domain-specific model. But in the general model, it is really going in all directions.\r\n\r\n\r\nYear\r\nNow let\'s take a look at a really general word: year\r\n\r\n(.wordsNearest musicians-model ["year"] [] 20)\r\nyear\r\ngrammy_award_for_best\r\nnaacap\r\nyear.\r\ngrammy_award\r\nnominated\r\nrock_new_artist_clip\r\nmusic_award\r\ngrammy_for_best\r\ncategory.\r\nsong_of_the\r\nmusic_video_awards_best_pop\r\nghantous.\r\nsalvador_da_bahia.\r\nwon\r\nso_intense\r\nentitled\r\nhe_was_grammy\r\nyear_and_recorded\r\nsong\r\n\r\n\r\n(.wordsNearest google-news-model ["year"] [] 20)\r\nyear\r\nmonth\r\nweek\r\nmonths\r\ndecade\r\nyears\r\nsummer\r\nyear.The\r\nSeptember\r\nweeks\r\nseason\r\nJune\r\nyaer\r\nweekend\r\nJuly\r\nJanuary\r\ntwoyears\r\nAugust\r\nthreeyear\r\nOctober\r\n\r\n\r\nThis one is quite interesting too. Both groups of words makes sense, but only in their respective contexts. With the musicians\' model, year is mostly related to awards (like the Grammy Awards 2016), categories like "song of the year", etc.\r\n\r\nIn the context of the general model, year is really related to time concepts: months, seasons, etc.\r\n\r\n\r\nPlaying With Co-Occurrences Vectors\r\nFinally we will play with manipulating the co-occurrences vectors by manipulating them. A really popular word2vec equation is king - man + women = queen. What is happening under the hood with this equation is that we are adding and substracting the co-occurence "vectors" for each of these words, and we check the nearest word of the resulting co-occurence vector.\r\n\r\nNow, let\'s take a look at a few of these equations.\r\n\r\n\r\nPianist + Renowned = ?\r\n(.wordsNearest musicians-model ["pianist" "renowned"] [] 10)\r\nrenowned\r\npianist\r\nteacher\r\nteacher.\r\nprolific\r\neducator.\r\nvirtuoso\r\nviolinist\r\nconductor\r\ncomposer\r\n\r\n\r\n(.wordsNearest google-news-model ["pianist" "renowned"] [] 10)\r\nrenowned\r\npianist\r\npianist_composer\r\njazz_pianist\r\nclassical_pianists\r\ncomposer_pianist\r\nvirtuoso_pianist\r\nrenowned_cellist\r\nviolinist\r\ntrumpet_virtuoso\r\n\r\n\r\nThese kinds of operations are also interesting. If we add the two co-occurrence vectors for pianist and renowned then we get that a teacher, an educator, a composer or a virtuoso is a renowned pianist.\r\n\r\nFor unambiguous surface forms like pianist, then the two models score quite well. The difference between the two examples comes from the way the general training corpus has been created (pre-processed) compared to the musicians corpus.\r\n\r\n\r\nMetal + Death = ?\r\n(.wordsNearest musicians-model ["metal" "death"] [] 10)\r\ndeath\r\nmetal\r\nthrash\r\ndeathcore\r\nmetalcore\r\ngrindcore\r\nmathcore\r\nmelodic\r\npresent_labels_insideout\r\ngothic\r\n\r\n\r\n(.wordsNearest google-news-model ["metal" "death"] [] 10)\r\ndeath\r\nmetal\r\nTunstall_bled\r\nsteel\r\nDeath\r\ncompressional_asphyxia\r\nuntimely_death\r\nthallium_toxic\r\nmetal_grindcore\r\nblackened_shards\r\n\r\n\r\nThis example uses two quite general words with no apparent relationship between them. The results with the musicians\' model are all the highly similar genre of music like trash metal, deathcore metal, etc.\r\n\r\nHowever with the general model, it is a mix of multiple unrelated concepts.\r\n\r\n\r\nMetal - Death + Smooth = ?\r\nLet\'s play some more with these equations. What if we want some kind of smooth metal?\r\n\r\n(.wordsNearest musicians-model ["metal" "smooth"] ["death"] 5)\r\nsmooth\r\nfunk\r\nsoul\r\ndisco\r\ndaniel_h\xe5kansson_genres\r\n\r\n\r\nThis one is also quite interesting. We substracted the death co-occurrence vector to the metal one, and then we added the smooth vector. What we end-up with is a bunch of music genres that are much smoother than death metal.\r\n\r\n(.wordsNearest google-news-model ["metal" "smooth"] ["death"] 5)\r\nsmooth\r\nmetal\r\nshredding_solos\r\nchromed_steel\r\nmetallic\r\nIn the case of the general model, we end-up with "smooth metal". The removal of the death vector has no effect on the results, probably since these are three ambiguous and really general terms.\r\n\r\n\r\nRelevance of the Use Case\r\nOf course, the likelihood that musicians are a domain of interest to most enterprises is low. However, this use case does have these implications:\r\n\r\nThe speed and ease of creating domain-specific training corpuses for word2vec (and other corpus-based models)\r\nThe ability to include other public and private text sources into the word2vec model (see, for example, how to link your own private datasets to KBpedia)\r\nTo use such domain-specific training corpuses to establish similarity between local text documents or HTML web pages\r\nTo combine with a topics analyzer to first tag text document using KBpedia reference concepts, and then inform or augment domain-specific training corpuses, and\r\nTo enable the testing and refinement of different combinations of "seed" concepts to produce training corpuses with the desired set of similarity results.\r\n\r\nConclusion\r\nAs we saw, creating domain-specific training corpuses to use with word2vec can have a dramatic impact on the results and how results can be much more meaningful within the scope of that domain. Another advantage of a domain-specific training corpus is it creates create much smaller models. Smaller models are faster to generate, faster to download/upload, faster to query, and consume less memory.\r\n\r\nOf the concepts in KBpedia, roughly 47,000 of them correspond to types (or classes) of various sorts. These pre-determined slices are available across all needs and domains to generate such domain-specific corpuses. Further, KBpedia is designed for rapid incorporation of your own domain information to add further to this discriminatory power.\r\n\r\n\r\n\r\nKBpedia\r\n\r\nKBpedia exploits large-scale knowledge bases and semantic technologies for machine learning, data interoperability and mapping, and fact extraction and tagging.\r\n\r\nLatest News\r\nOpen-source Baseline for KBpedia Now Available\r\n02/04/2019\r\nKBpedia is Now Open Source\r\n10/23/2018\r\nKBpedia v. 151 Released\r\n09/13/2017\r\nOther Resources\r\nABOUT\r\nFAQ\r\nNEWS\r\nUSE CASES\r\nDOCUMENTATION\r\nPRIVACY\r\nTERMS OF USE\r\nContact Us\r\nc/o Cognonto Corp.\r\n380 Knowling Drive\r\nCoralville, IA 52241\r\nU.S.A.\r\nVoice: +1 319 621 5225\r\n2016-2019 \xa9 Cognonto Corp.Cognonto Corp. All Rights Reserved.\r\n\r\n\r\n\r\n\r\n'}),new u({order:3}),new m],I=function(){x=0;for(var e=[],t=function(t){var n=A[t],r=n.name||"Provider",a=n.query(y.value,y.selectionStart);a?!a instanceof Array?console.error("".concat(r," returned ").concat(a," instead of an array")):(a=a.filter(function(e){return"string"===typeof e||(console.error("".concat(r," gave ").concat(e," instead of a string for one of the paths")),!1)}),e=e.concat(a)):console.error("".concat(r," returned ").concat(a," instead of an array"))},n=0;n<A.length;n++)t(n);var r=k,a=e;k=[];for(var i=0;i<a.length;i++)for(var o=a[i],s=0;s<r.length;s++){var c=r[s];if(c.string===o){k.push(c),a.splice(i,1),i--,r.splice(s,1),s--;break}}for(var l=0;l<a.length;l++)for(var h=a[l],d=0;d<r.length;d++){var u=r[d];if(u.string[0]===h[0]){u.set_string(h),k.push(u),a.splice(l,1),l--,r.splice(d,1),d--;break}}for(var m=0;m<a.length;m++){var p=new D(a[m]);k.push(p)}var g=new Map;k.forEach(function(e){return g.set(e,S(e.string))}),k.sort(function(e,t){return g.get(t)-g.get(e)})},B=new w({maxDistance:10}),S=function(e){return B.evaluate(e)},O=0,W=20,j=25,q=0,C=!0,z="",E=0,M=new Map,N=function(e){if(M.has(e))return M.get(e);var t=document.createElement("canvas"),n=t.getContext("2d");n.font=W+"px Arial";var r=n.measureText(e).width;return t.glyph_width=r,t.width=r+5,t.height=j+5,n.font=W+"px Arial",n.textAlign="left",n.textBaseline="top",n.fillText(e,0,5),M.set(e,t),t};function D(e){this.string=e,this.glyphs=[];for(var t=0;t<e.length;t++){var n=e[t];this.glyphs.push({char:n,glyph_canvas:N(n),x:0,y:0,rot:0,alpha:0,x_vel:0,y_vel:0,rot_vel:0,alpha_to:0})}}D.prototype.set_string=function(e){var t=this.glyphs,n=this.string;this.string=e,this.glyphs=[];for(var r=0,a=0;a<e.length;a++){var i=n[r],o=e[a];if(o===i)this.glyphs.push(t[r]),r++;else{var s=this.glyphs[this.glyphs.length-1];this.glyphs.push({char:o,glyph_canvas:N(o),x:s?s.x+s.glyph_canvas.glyph_width:0,y:s?s.y:0,rot:0,alpha:0,x_vel:0,y_vel:0,rot_vel:0,alpha_to:0})}}};D.prototype.simulate=function(e,t,n){for(var r=0,a=0;a<this.glyphs.length;a++){var i=this.glyphs[a],o=this.glyphs[a-1];o&&(r=o.x_to+o.glyph_canvas.glyph_width),i.x_to=r,i.y_to=t,i.alpha_to=e&&Math.min(1,Math.max(0,(n-a+30)/20)),i.alpha+=(i.alpha_to-i.alpha)/4;i.x_vel+=.5*(i.x_to-i.x),i.y_vel+=.5*(i.y_to-i.y),i.x_vel/=3,i.y_vel/=3,i.x+=i.x_vel,i.y+=i.y_vel}};try{y.value=localStorage["diverge current path"]||""}catch(L){}I(),y.addEventListener("focus",function(){q=0,C=!0}),y.addEventListener("input",function(){try{localStorage["diverge current path"]=y.value}catch(L){}I()}),window.addEventListener("keydown",function(e){switch(e.key){case"Tab":var t=T();t&&(n=t.string,y.select(),document.execCommand("insertText",!1,n));break;case"ArrowUp":_(-1);break;case"ArrowDown":_(1);break;default:return}var n;e.preventDefault()},!1),b.addEventListener("mousedown",function(e){e.preventDefault(),y.focus()},!1),function e(t){requestAnimationFrame(e),function(){var e=window.innerWidth,t=window.innerHeight;b.width!==e&&(b.width=e),b.height!==t&&(b.height=t)}(),v.clearRect(0,0,b.width,b.height),v.font=W+"px/"+j+"px Arial";var n=y.value,r=y.selectionStart,a=y.selectionEnd,i=Math.min(r,a),o=Math.max(r,a),s=n.slice(0,i),c=n.slice(i,a),l=n.slice(a),h=v.measureText(s).width,d=v.measureText(c).width;n===z&&a===E&&a===r||(C=!0,q=0),(q+=1)>40&&(C=!C,q=0),O+=(h-O)/20,v.save(),v.translate(b.width/2,b.height/2),v.translate(-O,0),v.fillStyle="rgba(0, 120, 255, 0.56)",v.fillRect(h,-W,d,j),v.fillStyle="black",v.fillText(s,0,0),v.fillStyle="white",v.fillText(c,h,0),v.fillStyle="black",v.fillText(l,h+d,0);var u=document.activeElement===y&&document.hasFocus();C&&u&&a===r&&v.fillRect(h,-W,2,j);for(var m=0,p=0;p<k.length;p++){var g=k[p],f=0===g.string.toLowerCase().indexOf(n.toLowerCase())&&g.string!==n;g._visible=f,g.autoCompleteHilight=T()===g,g.simulate(f,m,o);for(var w=0;w<g.glyphs.length;w++){var x=g.glyphs[w],_=x.glyph_canvas;v.globalAlpha=x.alpha,g.autoCompleteHilight&&(v.save(),v.fillStyle="rgba(255, 255, 0, 0.5)",v.fillRect(x.x,x.y,_.glyph_width,j),v.restore()),v.drawImage(_,x.x,x.y)}f&&(m+=j)}v.globalAlpha=1,v.restore(),z=n,E=a}()}},[[5,1,2]]]);
//# sourceMappingURL=main.351fbcfe.chunk.js.map