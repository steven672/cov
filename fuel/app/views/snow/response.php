<?php

    // HTML decode the server's response (server's response is digested as HTML by CURL)
    // Quietly handle the case where the server has no response
    echo (isset($response) ? html_entity_decode($response) : NULL);
